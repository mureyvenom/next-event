import classes from "../../../styles/logistics-item.module.css";

interface LogisticsItemPropType {
  children: React.ReactNode;
  icon: React.FC;
}

function LogisticsItem({ icon, children }: LogisticsItemPropType) {
  const Icon = icon;
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
