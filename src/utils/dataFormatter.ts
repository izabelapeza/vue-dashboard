// non english speakers
type nonEnglishSpeakers = {
  Geography: string;
  "ID Geography": string;
  "ID Language Spoken at Home": number;
  "ID Year": number;
  "Language Spoken at Home": string;
  "Languages Spoken": number;
  "Slug Geography": string;
  Year: string;
};

export const nonEnglishSpeakersFormat = (
  dataToFormat: nonEnglishSpeakers[]
) => {
  const dataInOrder = dataToFormat
    .filter((data) => {
      return (
        data["ID Year"] === 2019 && data["ID Language Spoken at Home"] !== 0
      );
    })
    .sort((l1, l2) => {
      return l2["Languages Spoken"] - l1["Languages Spoken"];
    })
    .slice(0, 20);
  const labels = dataInOrder.map((data) => {
    return data["Language Spoken at Home"];
  });
  const data = dataInOrder.map((data) => {
    return data["Languages Spoken"];
  });
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: "#f26b38",
      },
    ],
  };
};
