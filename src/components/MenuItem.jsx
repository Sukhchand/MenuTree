import React, { createRef } from 'react'

export const MenuItem = function ({ name, index, parent, onDragStart, onDrop }) {
  const ref = createRef()

  const handleDragStart = evt => {
    onDragStart(evt)
  }

  const handleDragEnter = evt => {
    if (evt.target.getAttribute('data-drop-zone') === 'true') {
      evt.target.style.borderColor = '#ffffff'
    }
    evt.preventDefault()
  }

  const handleDragLeave = evt => {
    if (evt.target.getAttribute('data-drop-zone') === 'true') {
      evt.target.style.borderColor = 'transparent'
    }
    evt.preventDefault()
  }

  const handleDragOver = evt => {
    evt.preventDefault()
  }

  const handleDrop = evt => {
    console.log('handleDrop')
    if (evt.target.getAttribute('data-drop-zone') === 'true') {
      evt.target.style.borderColor = 'transparent'
    }
  }

  return (
    <div
      ref={ref}
      data-index-value={index}
      data-parent-id={parent}
      data-drop-zone={true}
      className={'app-menu-item'}
      draggable={'true'}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >{index ? (`${index}. `) : ''} {name}</div>
  )
}