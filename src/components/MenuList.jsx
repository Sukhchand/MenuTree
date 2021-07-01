import React, { useEffect, useState } from 'react'
import Api from '../api/index'
import { MenuItem } from './MenuItem'
import { MenuListGenerator } from './MenuListGenerator'

import './Menus.css'

export const MenuList = function () {
  const [ menu, setMenu ] = useState(null);
  const [showChildMenu, setShowChildMenu] = useState(true);


  useEffect(() => {
    fetch('http://localhost:8000/api/getMenuList')
      .then(result=> result.json())
      .then(data=> setMenu({ ...data.body }))
  }, [])

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', null) // e.target.getAttribute('data-parent-id'))
    e.dataTransfer.dropEffect = 'move'
  }
  const onDrop = (e) => {
    console.log('drop')
    e.preventDefault()
  }

  const toggleChildMenuItem = (e, index) => {
    e.preventDefault();
    var toggle= menu.Recommendations[index].isOpen = !menu.Recommendations[index].isOpen;
    setMenu({...menu, toggle});
  }
  
  const updateMenu = e => {
    for(var i=0; i< menu.Recommendations.length; i++) {
      if(!e) return null;
      e = e[menu.Recommendations[i]];
    }
    console.log(e);
    return e;
    // setMenu({...menu, e});
    
  }

  return (
    <div className={'app-menus'}>
      {menu?.Recommendations.map((data, index) => {
        return (
          <div className={'app-menu-item-wrapper'} key={menu.RestaurantName}>
             <span onClick={(e) => toggleChildMenuItem(e, index)}>
              <svg width="16" height="10">
                <polygon points="0,0 16,0 8,10"/>
              </svg>
            </span>
            <MenuItem name={data.RestaurantName} index={index + 1} onDragStart={onDragStart} onDrop={onDrop} parent={null} />
            {data.isOpen && data.menu?.map(innerMenu =>
              MenuListGenerator(innerMenu.children, index, data.RestaurantID,
                e => onDragStart(e),
                e => onDrop(e),
                e => updateMenu(e)
              ))}
          </div>
        )
      })}
    </div>
  )
}