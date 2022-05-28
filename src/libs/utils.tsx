export function cls(...classNames: string[]) {
  return classNames.join(' ');
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) - min;
};

export const doWorks = async (works: GameWork[]): Promise<void> => {
  for (const work of works) {
    await work();
  }
};

export const delay = (sec: number) => {
  let count = 0;

  return new Promise(r => {
    const id = setInterval(() => console.log(count++), 1000);
    setTimeout(() => {
      r(true);
      clearInterval(id);
      count = 0;
    }, sec * 1000);
  });
};

export const deleteAudioAll = () => {
  const $root = document.querySelector('#root');
  const $audios = document.querySelectorAll('audio');
  $audios.forEach($audio => $root?.removeChild($audio));
};
