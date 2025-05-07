const Icon = (
  Icon: React.ComponentType<{
    size?: number;
    color?: string;
    style?: React.CSSProperties;
  }>,
  size?: number,
  color?: string
) => {
  return (
    <Icon
      size={size}
      color={color}
      style={{ position: "relative", top: "4px", left: "3px" }}
    />
  );
};

export default Icon;
