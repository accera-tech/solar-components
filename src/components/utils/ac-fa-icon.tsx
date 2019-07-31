import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FunctionalComponent } from '@stencil/core';

interface AcFaIconProps {
  icon: IconDefinition,
  anim?: string,
  size?: number,

  [key: string]: any,
}

export const AcFaIcon: FunctionalComponent<AcFaIconProps> = props => {
  const {
    icon,
    anim,
    size,
    class: classList,
    style,
    ...restProps
  } = props;

  const parentClasses = anim ? `icon--anim-${anim} ` + classList : classList;

  return (
    <div
      class={parentClasses}
      style={{ display: 'flex', justifyContent: 'center', ...style }}
      {...restProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`} height={size || 16}>
        <path d={icon.icon[4]} />
      </svg>
    </div>
  );
};
