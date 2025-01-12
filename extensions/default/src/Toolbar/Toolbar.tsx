import React from 'react';
import { Tooltip } from '@ohif/ui';
import classnames from 'classnames';
import { useToolbar } from '@ohif/core';
const mobileToolbarIds = ['Zoom', 'WindowLevel', 'Pan', 'MoreTools'];
export function Toolbar({ servicesManager, buttonSection = 'primary' }) {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection,
  });

  if (!toolbarButtons.length) {
    return null;
  }
  const isMobile = window.innerWidth <= 768; // You might want to use a more robust method to detect mobile
  return (
    <>
      {toolbarButtons.map(toolDef => {
        if (!toolDef) {
          return null;
        }

        const { id, Component, componentProps } = toolDef;
        if (isMobile && !mobileToolbarIds.includes(id)) {
          return null;
        }
        const tool = (
          <Component
            key={id}
            id={id}
            onInteraction={onInteraction}
            servicesManager={servicesManager}
            {...componentProps}
          />
        );

        return <div key={id}>{tool}</div>;
      })}
    </>
  );
}
