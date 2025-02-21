export const getTimeText = (time:number):string => {
  if (time < 120) {
    return 'Morning';
  } else if (time < 240) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}