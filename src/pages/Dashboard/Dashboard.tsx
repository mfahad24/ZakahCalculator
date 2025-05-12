import { useTranslation } from "react-i18next";

const Dashboard = ({}: {}) => {
  const { t } = useTranslation();

  return (
    <>
      <p>{t("dashboardView")}</p>
    </>
  );
};

export default Dashboard;
