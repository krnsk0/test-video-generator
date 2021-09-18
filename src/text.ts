type IText = {
  size?: number;
  color?: string;
  x?: string;
  y?: string;
  text?: string;
};

export const text = ({
  size = 30,
  color = 'white',
  x = `(w-text_w)/2`,
  y = `(h-text_h)/2`,
  text = 'default',
}: IText) => {
  return `
    drawtext=
    fontfile=roboto.ttf:
    fontsize=${size}:
    fontcolor=${color}:
    x=${x}:
    y=${y}:
    text='${text}'
  `;
};
