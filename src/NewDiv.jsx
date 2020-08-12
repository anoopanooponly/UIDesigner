import styled from 'styled-components';
import React,  { Component  } from 'react';
import ReactDOM from 'react-dom';
import './Panel.css';
import ResizableDiv from './ResizeDiv';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid=8
const getItemStyle2 = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0px ${grid}px 0`,
  
    display: "inline-flex",
    // width: "120px",
    
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
   
   
   
    border: "1px solid grey",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 4,
    margin: `0 0px ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "whitesmoke",
    display: "flex",
    flexFlow: "row",
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

  class NewDiv extends React.Component {
    eventHandler = null
  
    
    constructor (props) {
      super(props)
      
      this.state = {
        isDragging: false,
        panels: [301, 302]
      }
    }
  
    componentDidMount () {
      ReactDOM.findDOMNode(this).addEventListener('mousemove', this.resizePanel)
      ReactDOM.findDOMNode(this).addEventListener('mouseup', this.stopResize)
       ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.stopResize)
    }
    
    startResize = (event, index) => {
      this.setState({
        isDragging: true,
        currentPanel: index,
        initialPos: event.clientX
      })
    }
    
    mouseLeave = () => {
        console.log("mouseLeave")
    }


    stopResize = () => {
      if (this.state.isDragging) {
        
        this.setState(({panels, currentPanel, delta}) => ({
          isDragging: false,
          panels: {
            ...panels,
            [currentPanel]: (panels[currentPanel] || 0) + delta,
            // [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
          },
          delta: 0,
          currentPanel: null
        }), () => {
            console.log(this.state)
        })
      }
    }
    
    resizePanel = (event) => {
        console.log("resizing:", this.state.isDragging )
      if (this.state.isDragging) {
        const delta = event.clientX - this.state.initialPos;
        console.log("resizing:", event.clientX, delta )
        this.setState({
          delta: delta
        })
      }
    }
    
    render() {
    
        return (
        
            <Draggable key={this.props.list} draggableId={this.props.list} index={this.props.index}>
            {(provided, snapshot) => (
              <div onMouseUp={() => this.stopResize()}>
                <div className="dragContainer"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  
                  <span
                    {...provided.dragHandleProps}
                    className="drag"
                  > </span>
                    

                  {this.props.orgstate[this.props.list].length
                                      ? this.props.orgstate[this.props.list].map(
                                            (listItems, index) => (
                                              listItems.columns && listItems.columns.length && listItems.columns.map( (column, index) => (
                                                <Droppable
                                                droppableId={column.id}
                                                direction="horizontal"
                                                type="items"
                                            >
                                                {(provided, snapshot) => (
                                                 <div className="panel-container" >
                                                <div  className="panel" style={{width: `${this.state.panels[index]}px`  }}
                                                    ref={provided.innerRef}
                                                    
                                                >
                                                    {column.items.map((item, index) => (
                                        
                                                        <ResizableDiv item={item} index={index}></ResizableDiv>
                                        
                                                    ))}
                                                    
                                                </div>
                                                
                                                <div onMouseDown={(e) => this.startResize(e, index)}
                                                            key={"resizer_" + this.props.index}
                                                            style={this.state.currentPanel === index ? {left: this.state.delta} : {}}
                                                            className="resizer"></div></div>
                                                )}
                                            </Droppable>

                                                 
                                              ))
                                                
                                               
                                            )
                                        ) :  (
                                          <Notice>
                                              Drop items here1
                                          </Notice>
                                      )
                                        }

                </div>
                
              </div>
            )}
          </Draggable>
    
      )
    }
  }
  
  export default NewDiv;