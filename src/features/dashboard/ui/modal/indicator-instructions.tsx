import { Image } from "antd";
import { motion } from "framer-motion";

export const IndicatorInstructions = ({ id }: { id: string }) => {
  const getInstructions = (id: string) => {
    switch (id) {
      case "Температура тела":
        return [
          {
            name: "Подготовка термометра",
            img: "https://www.wikihow.com/images/thumb/2/23/Take-a-Temperature-Step-18.jpg/v4-728px-Take-a-Temperature-Step-18.jpg.webp",
          },
          {
            name: "Выбор места измерения",
            img: "https://www.wikihow.com/images/thumb/e/e4/Take-a-Temperature-Step-17.jpg/v4-728px-Take-a-Temperature-Step-17.jpg.webp",
          },
          {
            name: "Измерение",
            img: "https://www.wikihow.com/images/thumb/9/99/Take-a-Temperature-Step-19.jpg/v4-728px-Take-a-Temperature-Step-19.jpg.webp",
          },
          {
            name: "Считывание результата",
            img: "https://www.wikihow.com/images/thumb/f/fa/Take-a-Temperature-Step-20.jpg/v4-728px-Take-a-Temperature-Step-20.jpg.webp",
          },
        ];

      case "Частота сердцебиения":
        return [
          {
            name: "Сядьте в спокойном месте и отдохните 5-10 минут перед измерением",
            img: "https://idoktor24.ru/img/62/mozhno-pri-gaymorite-07FA7C.jpg",
          },
          {
            name: "Нащупайте пульс на запястье или шее",
            img: "https://www.wikihow.com/images/thumb/7/78/Calculate-Your-Heart-Rate-Step-1-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-1-Version-2.jpg.webp",
          },
          {
            name: "Считайте удары в течение 30 секунд",
            img: "https://www.wikihow.com/images/thumb/d/d5/Calculate-Your-Heart-Rate-Step-2-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-2-Version-2.jpg.webp",
          },
          {
            name: "Умножьте полученное число на 2. Нормальный пульс в покое 60-100 ударов в минуту",
            img: "https://www.wikihow.com/images/thumb/d/d2/Calculate-Your-Heart-Rate-Step-3-Version-2.jpg/v4-728px-Calculate-Your-Heart-Rate-Step-3-Version-2.jpg.webp",
          },
        ];

      case "Часы сна":
        return [
          {
            name: "Установите постоянное время отхода ко сну и пробуждения",
            img: "https://www.wikihow.com/images_en/thumb/a/a1/Sleep-Better-Step-20-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-20-Version-5.jpg.webp",
          },
          {
            name: "Обеспечьте темную, тихую и прохладную среду для сна",
            img: "https://www.wikihow.com/images_en/thumb/d/db/Sleep-Better-Step-5-Version-6.jpg/550px-nowatermark-Sleep-Better-Step-5-Version-6.jpg.webp",
          },
          {
            name: "Записывайте время засыпания и пробуждения",
            img: "https://www.wikihow.com/images_en/thumb/f/fb/Sleep-Better-Step-14-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-14-Version-5.jpg.webp",
          },
          {
            name: "Проверяйте продолжительность сна, норма для взрослого 7-9 часов",
            img: "https://www.wikihow.com/images_en/thumb/0/0b/Sleep-Better-Step-19-Version-5.jpg/550px-nowatermark-Sleep-Better-Step-19-Version-5.jpg.webp",
          },
        ];

      case "Шагов за день":
        return [
          {
            name: "Активируйте шагомер в телефоне или фитнес-браслете",
            img: "https://www.wikihow.com/images/thumb/2/2b/Walk-10%2C000-Steps-a-Day-Step-1-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-1-Version-2.jpg.webp",
          },
          {
            name: "Носите устройство согласно инструкции для точного подсчета",
            img: "https://www.wikihow.com/images/thumb/d/d2/Walk-10%2C000-Steps-a-Day-Step-2-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-2-Version-2.jpg.webp",
          },
          {
            name: "Следите за прогрессом в течение дня",
            img: "https://www.wikihow.com/images/thumb/8/84/Walk-10%2C000-Steps-a-Day-Step-5-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-5-Version-2.jpg.webp",
          },
          {
            name: "Анализируйте количество шагов, цель - 8000-10000 шагов в день",
            img: "https://www.wikihow.com/images/thumb/d/d7/Walk-10%2C000-Steps-a-Day-Step-4-Version-2.jpg/v4-728px-Walk-10%2C000-Steps-a-Day-Step-4-Version-2.jpg.webp",
          },
        ];
    }
  };

  const instructions = getInstructions(id);

  return (
    <div className="flex flex-col gap-6">
      <ol className="list-decimal ml-4 space-y-6">
        {instructions?.map((instruction, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl"
            >
              <Image
                preview={false}
                src={instruction.img}
                alt={instruction.name}
                className="rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:brightness-105"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="space-y-1"
            >
              <h3 className="font-medium text-primary">{instruction.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getInstructionDescription(id, index)}
              </p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

function getInstructionDescription(id: string, index: number): string {
  const descriptions: Record<string, string[]> = {
    "Температура тела": [
      "Проверьте термометр на наличие повреждений и протрите его дезинфицирующим средством",
      "Наиболее точные показания можно получить при измерении в подмышечной впадине",
      "Поместите термометр в подмышечную впадину и плотно прижмите руку к телу на 5-10 минут",
      "Аккуратно извлеките термометр и посмотрите показания. Нормальная температура тела 36.6°C ± 0.5°C",
    ],
    "Частота сердцебиения": [
      "Найдите тихое место и отдохните несколько минут для точного измерения",
      "Расположите два пальца на запястье или шее, где прощупывается пульс",
      "Используйте секундомер для подсчета ударов в течение 30 секунд",
      "Умножьте результат на 2. В норме пульс составляет 60-100 ударов в минуту",
    ],
    // Добавьте описания для других показателей...
  };

  return descriptions[id]?.[index] || "";
}
