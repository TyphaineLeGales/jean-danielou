const months = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
};

export const parseFrenchDate = (date:string) => {
  const [day, month, year] = date.toLowerCase().split(" ");

  return new Date(
    Number(year),
    months[month],
    Number(day)
  ).getTime();
};