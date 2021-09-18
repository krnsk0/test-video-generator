type IText = {
  size?: number;
  color?: string;
  x?: string;
  y?: string;
  text?: string;
  box?: boolean;
  boxcolor?: string;
  // e.g. lt(mod(t\,3)\,1)
  enable?: string;
};

export const text = ({
  size = 30,
  color = 'white',
  x = `(w-text_w)/2`,
  y = `(h-text_h)/2`,
  text = 'default',
  box = false,
  boxcolor = 'black',
  enable = '',
}: IText) => {
  return `
    drawtext=
    fontfile=roboto.ttf:
    fontsize=${size}:
    fontcolor=${color}:
    x=${x}:
    y=${y}:
    text=\\'${text}\\'
    ${
      box
        ? `
    :box=1:
    boxcolor=${boxcolor}:
    boxborderw=15
    `
        : ``
    }
    ${enable ? `:enable=${enable}` : ''}
  `;
};
