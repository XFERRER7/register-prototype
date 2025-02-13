export const masks = {
  cnpj: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const masked = onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5")

    return {
      masked,
      original: onlyNumbers
    }
  },
  cpf: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');

    let masked = onlyNumbers;
    if (onlyNumbers.length > 3) {
      masked = onlyNumbers.slice(0, 3) + '.' + onlyNumbers.slice(3);
    }
    if (onlyNumbers.length > 6) {
      masked = masked.slice(0, 7) + '.' + onlyNumbers.slice(6);
    }
    if (onlyNumbers.length > 9) {
      masked = masked.slice(0, 11) + '-' + onlyNumbers.slice(9);
    }

    return {
      masked,
      original: onlyNumbers
    };
  },
  phone: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const masked = onlyNumbers.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2")

    return {
      masked,
      original: onlyNumbers
    }
  },
  date: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const masked = onlyNumbers.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d)(\d{4})$/, "$1/$2")

    return {
      masked,
      original: onlyNumbers
    }
  },
  currency: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const masked = onlyNumbers.replace(/(\d{2})(\d)/, "$1,$2").replace(/(\d)(\d{4})$/, "$1.$2")

    return {
      masked,
      original: onlyNumbers
    }
  },
  creditCardMask: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');

    let masked = onlyNumbers;
    if (onlyNumbers.length > 4) {
      masked = onlyNumbers.slice(0, 4) + ' ' + onlyNumbers.slice(4);
    }
    if (onlyNumbers.length > 8) {
      masked = masked.slice(0, 9) + ' ' + onlyNumbers.slice(8);
    }
    if (onlyNumbers.length > 12) {
      masked = masked.slice(0, 14) + ' ' + onlyNumbers.slice(12);
    }

    return {
      masked,
      original: onlyNumbers
    };
  },
  postalCode: (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');

    let masked = onlyNumbers;
    if (onlyNumbers.length > 5) {
      masked = onlyNumbers.slice(0, 5) + '-' + onlyNumbers.slice(5);
    }

    return {
      masked,
      original: onlyNumbers
    };
  },
}