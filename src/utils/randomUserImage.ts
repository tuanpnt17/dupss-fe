export const randomUserImage = () => {
  const randomNumber = Math.floor(Math.random() * 37);
  if (randomNumber < 10) {
    return `/images/user/user-0${randomNumber}.jpg`;
  }
  return `/images/user/user-${randomNumber}.jpg`;
};