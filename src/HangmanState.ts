enum HangmanState {
  NONE = 0,
  HEAD = 1,
  EYES = 2,
  MOUTH = 3,
  BODY = 4,
  LEFT_ARM = 5,
  RIGHT_ARM = 6,
  LEFT_LEG = 7,
  RIGHT_LEG = 8,
}
export default HangmanState;
export const HangmanStateAssetPaths: { [key in HangmanState]: string } = {
  [HangmanState.NONE]: './assets/NONE.png',
  [HangmanState.HEAD]: './assets/HEAD.png',
  [HangmanState.EYES]: './assets/EYES.png',
  [HangmanState.MOUTH]: './assets/MOUTH.png',
  [HangmanState.BODY]: './assets/BODY.png',
  [HangmanState.LEFT_ARM]: './assets/LEFT_ARM.png',
  [HangmanState.RIGHT_ARM]: './assets/RIGHT_ARM.png',
  [HangmanState.LEFT_LEG]: './assets/LEFT_LEG.png',
  [HangmanState.RIGHT_LEG]: './assets/RIGHT_LEG.png',
};

export function getHangmanStateAssets() {
  const assets: Map<HangmanState, HTMLImageElement> = new Map();
  const values: [HTMLImageElement, string][] = [];
  for (const [k, v] of Object.entries(HangmanStateAssetPaths)) {
    const img = new Image();
    assets.set(parseInt(k), img);
    values.push([img, v]);
  }

  return new Promise<Map<HangmanState, HTMLImageElement>>((res) => {
    Promise.allSettled(
      values.map(
        (e) =>
          new Promise((res) => {
            e[0].onload = () => res(null);
            e[0].setAttribute('src', e[1]);
          })
      )
    ).then(() => res(assets));
  });
}
