import React,{ Component } from "react"
import Note from "./Note";

class Board extends Component{

    constructor(props){
        super(props)
        this.onDelete = this.onDelete.bind(this)
        this.getNote  = this.getNote.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.createNewNote = this.createNewNote.bind(this)
        this.generateId = this.generateId.bind(this)
        this.state={
            notes : [
                // {
                //     id : 1 ,
                //     title : "My Note 1"
                // },
                // {
                //     id : 2 ,
                //     title : "My Note 2"
                // }
            ]
        }
    }

    onDelete(position) {
        //alert("Called onDelete: "+ position)
        this.setState({
            notes :  this.state.notes.filter(n=>n.id !==position)
        })
        
    }

    onUpdate(position,titles){
       // alert("Called onUpdate: "+ position+","+titles)
        this.setState({
            notes : this.state.notes.filter(n=>n.id===position? n.title=titles:n)
        })
    }

    getNote(note) {
        return <Note key={note.id} 
                     note={note}
                     onXXX={this.onDelete} 
                     onEdit={this.onUpdate}
               />;
    }

    generateId(){
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    createNewNote(newTitle){
        this.setState(prevState=>(
            {
                notes : [
                    ...prevState.notes,
                    {
                       id : this.generateId() ,
                       title : newTitle
                    }
                ]
            }
        ))
    }


    componentWillMount(){
        const self = this
        fetch('https://baconipsum.com/api/?type=all-meat&sentences=3')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           // console.log(JSON.stringify(myJson));
           myJson[0].split(". ").map( 
               v => self.createNewNote(v.substring(0,40)) )
        });
    }

    render(){
        return (
            <div className="board" >
            <button id="add" onClick={this.createNewNote.bind(null, 'New Note')}>
                Create New Note
            </button>
                {this.state.notes.map( note => this.getNote(note))}
            </div>
        )
    }

}
export default Board