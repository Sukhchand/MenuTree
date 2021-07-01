import { MenuItem } from './MenuItem';
import React from 'react';

export const MenuListGenerator = function (children, index, parent, onDragStart, onDrop, updateMenu) {
  if ((Array.isArray(children) && !children.length)) {
    return <div/>
  }
  const toggleChildMenuItem = (e, node, index) => {
    e.preventDefault();
    node.isOpen = !node.isOpen;
    updateMenu(node);
    
  }
  return (
    <div>
      {children?.map((rChild, rIndex) => {
        return (
          <div key={rChild.name} className={'app-menu-child'}>
            <span onClick={(e) => toggleChildMenuItem(e, rChild, index)}>
              <svg width="16" height="10">
                <polygon points="0,0 16,0 8,10"/>
              </svg>
            </span>
            <MenuItem
              name={rChild.name}
              index={rIndex + 1}
              parent={parent}
              onDragStart={onDragStart}
              onDrop={onDrop}/>
            {MenuListGenerator(rChild.children, rIndex, rChild.id, onDragStart, onDrop)}
          </div>
        )
      })}
    </div>
  )
}