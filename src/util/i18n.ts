import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Header: {
        header: "Zakah Calculator",
        nisabValue_loading: "Retrieving nisab value",
        nisabValue_error:
          "Unable to retrieve nisab value. Please enter your own.",
        nisabValue_success: "Current nisab value: {{symbol}}{{value}}*",
        descriptionOne:
          "Your zakah due is calculated at 2.5% of your total amount only if your total amount is equal to or above the nisab. Nisab is the price of gold per ounce x 3",
        descriptionTwo:
          "If you have a <linkOne>nisab value from a different date</linkOne> or have your own nisab value from a different source, enter it on line 1.",
        descriptionThree: "Should you have any questions about Zakah please contact the <linkOne>Assembly of Muslim Jurists of America (AMJA)</linkOne><linkTwo>(916)239–6233</linkTwo>",
        updateDisclosure: "*updates every 24 hours",
        eligibleForZakah: "Eligible For Zakah", 
        yourZakahDue: "Your Zakah Due",
        userNisab_optional: "1. Enter your own nisab value (optional)",
        userNisab_required: "1. Enter your own nisab value (required)",
        cashOnHand: "2. Cash on hand and in back accounts (savings, checking, etc)",
        loans: "3. Non-delinquent loans (money you loaned to others)",
        gold: "4. Value of gold, silver and precious items",
        stocks: "5. Value of shares and stocks",
        "401k": "6. Net value of IRA, 401K, pension funds if liquidated as of the zakat payment date (adjusted for taxes and penalties, if applicable)",
        business: "7. Net value of business inventory and trade goods",
        realEstate: "8. Equity in investment real estate"
      },
    },
  },
  ar: {
    translation: {
      Header: {
        header: "حاسبة الزكاة",
        nisabValue_loading: "استرجاع قيمة النصاب",
        nisabValue_error:
          "تعذر استرداد قيمة النصاب. يُرجى إدخال قيمة النصاب الخاصة بك",
        nisabValue_success: "قيمة النصاب الحالية: {{symbol}}{{value}}",
        descriptionOne:
          "تُحسب زكاتك بنسبة ٢.٥٪ من إجمالي المبلغ فقط إذا كان المبلغ الإجمالي يساوي أو يزيد عن النصاب. النصاب هو سعر أوقية الذهب × ٣",
        descriptionTwo:
          "إذا كانت لديك <linkOne>قيمة نصاب من تاريخ مختلف</linkOne> أو من مصدر مختلف، أدخلها في السطر 1.",
        descriptionThree: "إذا كانت لديك أي أسئلة حول الزكاة، يرجى التواصل مع <linkOne>جمعية الفقهاء المسلمين في أمريكا (AMJA)</linkOne><linkTwo>(916)239–6233</linkTwo>",
        updateDisclosure: "تحديثات كل 24 ساعة*",
        eligibleForZakah: "المستحقون للزكاة",
        yourZakahDue: "واجب الزكاة الخاص بك",
                userNisab_optional: "1. أدخل قيمة النصاب الخاصة بك (اختياري)",
        userNisab_required: "1. أدخل قيمة النصاب الخاصة بك (مطلوب)",
        cashOnHand: "2. النقد في متناول اليد وفي الحسابات الخلفية (التوفير، والحسابات الجارية، وما إلى ذلك)",
        loans: "3. القروض غير المتعثرة (الأموال التي أقرضتها للآخرين)",
        gold: "4. قيمة الذهب والفضة والأشياء الثمينة",
        stocks: "5. قيمة الأسهم والسندات",
        "401k": "6. القيمة الصافية لصناديق التقاعد (IRA) و(401K) إذا تم تصفيتها في تاريخ دفع الزكاة (بعد تعديلها للضرائب والغرامات، إن وجدت)",
        business: "7. القيمة الصافية لمخزون الأعمال والسلع التجارية",
        realEstate: "8. حقوق الملكية في العقارات الاستثمارية"
      },
    },
  },
};

//@ts-ignore
i18n.use(initReactI18next).init({
  resources,
  lang: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    transSupportBasicHtmlNodes: true,
  },
});

export default i18n;
