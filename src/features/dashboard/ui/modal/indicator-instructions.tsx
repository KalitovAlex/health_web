import { Image } from 'antd';

export const IndicatorInstructions = ({ id }: { id: string }) => {
  const getInstructions = (id: string) => {
    switch (id) {
      case "Температура тела":
        return [
          { name: "Подготовка термометра", img: "https://www.wikihow.com/images/thumb/2/23/Take-a-Temperature-Step-18.jpg/v4-728px-Take-a-Temperature-Step-18.jpg.webp" },
          { name: "Выбор места измерения", img: "https://www.wikihow.com/images/thumb/e/e4/Take-a-Temperature-Step-17.jpg/v4-728px-Take-a-Temperature-Step-17.jpg.webp" },
          { name: "Измерение", img: "https://www.wikihow.com/images/thumb/9/99/Take-a-Temperature-Step-19.jpg/v4-728px-Take-a-Temperature-Step-19.jpg.webp" },
          { name: "Считывание результата", img: "https://www.wikihow.com/images/thumb/f/fa/Take-a-Temperature-Step-20.jpg/v4-728px-Take-a-Temperature-Step-20.jpg.webp" },
        ];
        
      case "Частота сердцебиения":
        return [
          { name: "Сядьте в спокойном месте и отдохните 5-10 минут перед измерением", img: "https://idoktor24.ru/img/62/mozhno-pri-gaymorite-07FA7C.jpg" },
          { name: "Нащупайте пульс на запястье или шее", img: "https://www.wikihow.com/images/thumb/7/78/Calculate-Your-Heart-Rate-Step-1-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-1-Version-2.jpg.webp" },
          { name: "Считайте удары в течение 30 секунд", img: "https://www.wikihow.com/images/thumb/d/d5/Calculate-Your-Heart-Rate-Step-2-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-2-Version-2.jpg.webp" },
          { name: "Умножьте полученное число на 2. Нормальный пульс в покое 60-100 ударов в минуту", img: "https://www.wikihow.com/images/thumb/d/d2/Calculate-Your-Heart-Rate-Step-3-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-3-Version-2.jpg.webp" },
        ];

      case "Часы сна":
        return [
          { name: "Установите постоянное время отхода ко сну и пробуждения", img: "https://www.wikihow.com/images_en/thumb/a/a1/Sleep-Better-Step-20-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-20-Version-5.jpg.webp" },
          { name: "Обеспечьте темную, тихую и прохладную среду для сна", img: "https://www.wikihow.com/images_en/thumb/d/db/Sleep-Better-Step-5-Version-6.jpg/550px-nowatermark-Sleep-Better-Step-5-Version-6.jpg.webp" },
          { name: "Записывайте время засыпания и пробуждения", img: "https://www.wikihow.com/images_en/thumb/f/fb/Sleep-Better-Step-14-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-14-Version-5.jpg.webp" },
          { name: "Проверяйте продолжительность сна, норма для взрослого 7-9 часов", img: "https://www.wikihow.com/images_en/thumb/0/0b/Sleep-Better-Step-19-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-19-Version-5.jpg.webp" },
        ];

      case "Шагов за день":
        return [
          { name: "Активируйте шагомер в телефоне или фитнес-браслете", img: "https://www.wikihow.com/images/thumb/2/2b/Walk-10%2C000-Steps-a-Day-Step-1-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-1-Version-2.jpg.webp" },
          { name: "Носите устройство согласно инструкции для точного подсчета", img: "https://www.wikihow.com/images/thumb/d/d2/Walk-10%2C000-Steps-a-Day-Step-2-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-2-Version-2.jpg.webp" },
          { name: "Следите за прогрессом в течение дня", img: "https://www.wikihow.com/images/thumb/8/84/Walk-10%2C000-Steps-a-Day-Step-5-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-5-Version-2.jpg.webp" },
          { name: "Анализируйте количество шагов, цель - 8000-10000 шагов в день", img: "https://www.wikihow.com/images/thumb/d/d7/Walk-10%2C000-Steps-a-Day-Step-4-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-4-Version-2.jpg.webp" },
        ];
    }
  };

  const instructions = getInstructions(id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <ol className="list-decimal ml-4 space-y-3">
        <li className="flex flex-col gap-3">
          <Image
            preview={false}
            src={instructions![0].img}
            alt={instructions![0].name}
            className="rounded-lg"
          />
          <div>
            <h3 className="font-medium">Подготовка термометра</h3>
            <p>Проверьте термометр на наличие повреждений и протрите его дезинфицирующим средством</p>
          </div>
        </li>

        <li className="flex flex-col gap-3">
          <Image
            preview={false}
            className="rounded-lg"
            src={instructions![1].img}
            alt={instructions![1].name}
          />
          <div>
            <h3 className="font-medium">Выберите место измерения</h3>
            <p>Наиболее точные показания можно получить при измерении в подмышечной впадине</p>
          </div>
        </li>

        <li className="flex flex-col gap-3">
          <Image
            preview={false}
            className="rounded-lg"
            src={instructions![2].img}
            alt={instructions![2].name}
          />
          <div>
            <h3 className="font-medium">Измерение</h3>
            <p>Поместите термометр в подмышечную впадину и плотно прижмите руку к телу на 5-10 минут</p>
          </div>
        </li>

        <li className="flex flex-col gap-3">
          <Image
            preview={false}
            className="rounded-lg"
            src={instructions![3].img}
            alt={instructions![3].name}
          />
          <div>
            <h3 className="font-medium">Считывание результата</h3>
            <p>Аккуратно извлеките термометр и посмотрите показания. Нормальная температура тела 36.6°C ± 0.5°C</p>
          </div>
        </li>
      </ol>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      </div>
    </div>
  );
};
