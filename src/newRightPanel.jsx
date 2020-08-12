import styled from 'styled-components';
import React, { Component, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import NewDiv from './NewDiv'

const RightDiv = styled.div`
width: calc(100% - 88px);
transition: width ease 0.1s;
border-left: 1px solid #e1e1e1;
    min-height: 100%;
    overflow-y: scroll;
    height: 100%;
    position: relative;
    background-color: #dcdcdc;
    float: left;
     overflow: visible;
    flex-direction: column;
`

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const ViewPort = styled.div`
    margin-left: 146px;
    background: white;margin-top: 21px;height: 97%;
    margin-right: 20px;
    padding: 7px;
`;

const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${(props) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem 0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    border-right: 1px solid #ddd;
    color: #000;
`;

const List = styled.div`
    border: 1px
        ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const ControlsPane = styled(List)`
    position: absolute;
    width: 120px;
    background-color: white;
    border-right: 1px solid #e1e1e1;
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    right: 0;
    overflow: hidden;
`;

const Container = styled(List)`
    margin: 0.5rem 0.5rem 1.5rem;
    background: #ccc;
    width: 75vw;
`;

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

const Button = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #000;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
`;

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const Row = styled.div`
   display:flex;
   flex-direction:row;
   flex-wrap: wrap;
   justify-content:start;
   background-color:yellow;
   border:1px dotted green;
`;


const ITEMS = [
    {
        id: uuid(),
        content: 'Headline'
    },
    {
        id: uuid(),
        content: 'Copy'
    },
    {
        id: uuid(),
        content: 'Image'
    },
    {
        id: uuid(),
        content: 'Slideshow'
    },
    {
        id: uuid(),
        content: 'Quote'
    }
];

const grid = 8;
  const NewRightPanel = () => {
      const [state, setState] = useState({
          [uuid()]: [{
              columns: [{
                  id: uuid(), w: 20, items: [{
                      id: uuid(),
                      content: 'Headline',
                      w: 100
                  }]
              },
              {
                id: uuid(), w: 75, items: [{
                    id: uuid(),
                    content: 'newz',
                    w: 200
                }]
            }]
          }],  [uuid()]: [{
            columns: [{
                id: uuid(), w: 100, items: [{
                    id: uuid(),
                    content: 'Headline1',
                    w: 230
                }]
            },
            {
              id: uuid(), w: 200, items: [{
                  id: uuid(),
                  content: 'newz1',
                  w: 230
              }]
          }]
        }]
    
      });
  
     
    window.mystate =state;

    const onDragEnd1 = (result) => {
        const { source, destination } = result;

        console.log('==> result', result);

    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        console.log('==> result', result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setState({
                    [destination.droppableId]: reorder(
                        state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                setState(
                    move(
                        state[source.droppableId],
                        state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    const addList = (e) => {
          setState({ [uuid()]: [] });
    };

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? 'lightblue' : '',
        // width: 250
      });

      const getListStyle1 = () => ({
        display:'flex' ,
        width: 250,
        
      });
    
     
      const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 10px ${grid}px 0`,
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
        display: "flex",
        flexFlow: "row",
        // styles we need to apply on draggables
        ...draggableStyle
      });


      const getItemStyle2 = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 10px ${grid}px 0`,
      
        display: "inline-flex",
        // width: "120px",
        
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
       
       
       
        border: "1px solid grey",
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
      const getListStyle2 = (isDraggingOver, column) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        margin: "10px 0",
        marginLeft: "2px",
        width:`${column.w}%`,
        border: "1px dotted green"
      });


    return (
    <RightDiv>
       <DragDropContext onDragEnd={onDragEnd1}>
                <Droppable droppableId="ITEMS" isDropDisabled={true} type="items">
                    {(provided, snapshot) => (
                        <ControlsPane
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                            {ITEMS.map((item, index) => (
                                <Draggable 
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </ControlsPane>
                    )}
                </Droppable>
                <ViewPort style={{width:'1600px'}}>
                    {/* <Button onClick={addList}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                        </svg>
                        <ButtonText>Add List</ButtonText>
                    </Button> */}
          
                    <Droppable droppableId="droppable" type="App">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {Object.keys(state).map((list, index) => (

                  <NewDiv orgstate={state} list={list} index={index}></NewDiv>
                
              ))}
              
            </div>
          )}
        </Droppable>

                </ViewPort>
            </DragDropContext>
    </RightDiv>
    
   );
  }
  
  export default NewRightPanel;