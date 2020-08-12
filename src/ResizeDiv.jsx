import styled from 'styled-components';
import React,  { Component  } from 'react';
import ReactDOM from 'react-dom';
import './Panel.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle2 = (isDragging, draggableStyle, width) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 2,
  margin: `0 0px 2px 0`,

  display: "inline-flex",
   width: `${width}px`,
   height: "38px",
   justifyContent: "space-between",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
 
  
 
  border: "1px solid grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

  class ResizableDiv extends React.Component {
    eventHandler = null
  
    state = {
        isDragging: false,
        width:100
      }

    constructor (props) {
      super(props)
      
      this.state = {
        isDragging: false,
        width:this.props.item.w
      }
    }
  
    componentDidMount () {
      ReactDOM.findDOMNode(this).addEventListener('mousemove', this.resizePanel)
      ReactDOM.findDOMNode(this).addEventListener('mouseup', this.stopResize)
      // ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.stopResize)
    }
    
    startResize = (event) => {
      this.setState({
        isDragging: true,
        
        initialPos: event.clientX
      })
    }
    
    stopResize = () => {
      
      if (this.state.isDragging) {
        console.log("stopResize");
        console.log(this.state)
       
        this.setState(({delta}) => ({
          isDragging: false,
          width:this.state.width + this.state.delta,
          delta: 0
        }))
      }
    }
    
    resizePanel = (event) => {
      if (this.state.isDragging) {
        const delta = event.clientX - this.state.initialPos
        this.setState({
          delta: delta
        })
      }
    }
    
    render() {
      
      return (

        <Draggable key={this.props.item.id} draggableId={this.props.item.id} index={this.props.index}>
                {(provided, snapshot) => (
                <div className="dragContainer" style={{ display: "inline-flex",width: "100%" }}  onMouseUp={() => this.stopResize()} >
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle2(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        this.state.width
                    )}
                   
                    >
                          <span
                          {...provided.dragHandleProps}
                          className="drag"
                        > </span>
                                                               
                    {this.props.item.content}
                    <div onMouseDown={(e) => this.startResize(e)}
                    key={"resizer_"}
                     className="resizer"></div>
                    </div>
                   
                </div>

                )}
            </Draggable>

   
      )
    }
  }
  
  export default ResizableDiv;