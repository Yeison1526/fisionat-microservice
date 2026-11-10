import { promises as dns } from 'dns';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const COMMON_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'hotmail.es',
  'outlook.es',
  'yahoo.es',
  'gmail.co',
];

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[b.length][a.length];
}

function suggestDomain(domain: string): string | null {
  if (COMMON_DOMAINS.includes(domain)) return null;

  let best: { domain: string; distance: number } | null = null;
  for (const candidate of COMMON_DOMAINS) {
    const distance = levenshtein(domain, candidate);
    if (!best || distance < best.distance) {
      best = { domain: candidate, distance };
    }
  }

  if (!best) return null;
  const threshold = best.domain.length <= 8 ? 1 : 2;
  return best.distance > 0 && best.distance <= threshold ? best.domain : null;
}

async function hasMailDomain(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain);
    return mx.length > 0;
  } catch {
    try {
      await dns.resolve(domain);
      return true;
    } catch {
      try {
        await dns.resolve6(domain);
        return true;
      } catch {
        return false;
      }
    }
  }
}

@ValidatorConstraint({ name: 'EmailDomainExists', async: true })
export class EmailDomainExistsConstraint implements ValidatorConstraintInterface {
  async validate(value: unknown, _args: ValidationArguments): Promise<boolean> {
    if (typeof value !== 'string') return false;
    const email = value.trim();
    const at = email.lastIndexOf('@');
    if (at < 1 || at === email.length - 1) return false;

    const domain = email.slice(at + 1).toLowerCase();
    if (suggestDomain(domain)) return false;

    return hasMailDomain(domain);
  }

  defaultMessage(args: ValidationArguments): string {
    if (typeof args.value === 'string') {
      const email = args.value.trim();
      const at = email.lastIndexOf('@');
      if (at >= 1 && at < email.length - 1) {
        const suggestion = suggestDomain(email.slice(at + 1).toLowerCase());
        if (suggestion) {
          return `El correo parece mal escrito. ¿Quisiste decir @${suggestion}?`;
        }
      }
    }
    return 'El dominio del correo no existe o no puede recibir correos';
  }
}

export function EmailDomainExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailDomainExistsConstraint,
    });
  };
}
