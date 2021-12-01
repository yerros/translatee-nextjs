// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const translate = require("@vitalets/google-translate-api");

const doTranslate = (input, lang) => {
  return new Promise((resolve, reject) => {
    translate(input, { to: lang })
      .then((res) => {
        //console.log(res.text);
        resolve(res.text);
        sleep(1000);
        //=> I speak English
        //console.log(res.from.language.iso);
        //=> nl
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export default function translateNow(req, res) {
  const input = req.body.text;
  doTranslate(input, "nl").then((res1) => {
    doTranslate(res1, "id").then((result) => {
      //fs.writeFileSync("result.txt", result);
      res.status(200).json({ result: result });
      console.log(input);
    });
  });
}
