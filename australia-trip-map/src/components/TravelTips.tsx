import React, { useState } from 'react';
import { Info, Thermometer, Car, CreditCard, Wifi, Users, ChevronDown, ChevronUp } from 'lucide-react';

const TravelTips: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    {
      icon: <Thermometer className="text-blue-500" size={20} />,
      title: "氣候與穿著 (7-8月)",
      content: "澳洲冬季，早晚溫差大，建議採洋蔥式穿搭。白日可著薄長袖，晚上需添加保暖外套。海邊風大，建議攜帶防風外套。"
    },
    {
      icon: <Car className="text-green-500" size={20} />,
      title: "交通方式",
      content: "市區可利用Go Card搭乘大眾運輸工具。若欲前往郊區，建議租車。布里斯本和黃金海岸之間交通便利。"
    },
    {
      icon: <CreditCard className="text-purple-500" size={20} />,
      title: "貨幣與支付",
      content: "澳幣為法定貨幣。信用卡在多數地方皆可使用，但建議準備少量現金以備不時之需。"
    },
    {
      icon: <Wifi className="text-orange-500" size={20} />,
      title: "通訊與網路",
      content: "可在機場或市區購買Telstra、Optus或Vodafone的預付卡。多數公共場所提供免費WiFi。"
    },
    {
      icon: <Users className="text-red-500" size={20} />,
      title: "文化注意事項",
      content: "澳洲人重視守時，並有排隊的習慣。餐廳無硬性規定的小費文化，但可視服務品質酌情給予。"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex items-center justify-between hover:from-indigo-600 hover:to-purple-700 transition-all"
      >
        <div className="flex items-center">
          <Info className="mr-2" size={20} />
          <span className="font-semibold">澳洲旅遊實用資訊</span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="flex items-center mb-2">
                {tip.icon}
                <h3 className="font-semibold text-gray-800 ml-2">{tip.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tip.content}
              </p>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Info className="mr-2 text-yellow-600" size={16} />
              重要提醒
            </h3>
            <p className="text-sm text-gray-700">
              此次行程為青年百億海外圓夢基金計畫，旨在探索數位城市與影視靈感。
              請遵守當地法規，珍惜學習機會，與當地文化深度交流。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelTips;