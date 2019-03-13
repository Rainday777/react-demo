import React, { Component } from 'react';
import './index.css';
import { FaBeer } from  'react-icons/fa';

class Note extends Component {

 constructor(props) {
        console.log('call constructor')
        super(props);
        this.state = {
            isEdit: false
        };
        this.edit = this.edit.bind(this)
        this.save = this.save.bind(this)
        this.remove=this.remove.bind(this)        
        
        
    }

    edit() {
        console.log('Call edit')       
        this.setState({
            isEdit: true
        })
    }
    
    remove(){
        console.log('Call remove')
        this.props.onXXX(this.props.note.id)
    }

    save(e) {
        e.preventDefault()      
        console.log('Call save',this._newNoteName.value)
        this.props.onEdit(this.props.note.id,this._newNoteName.value)
        //this.props.note.title=this._newNoteName.value
        this.setState({
            isEdit: false
        })
    }

    renderEditNote() {
        return(
            <div className="note">
            <form onSubmit={this.save}>
                <textarea ref={value=>this._newNoteName=value} />
                <button id="save">save</button>
             </form>
            </div>
        )
    }

    renderNote() {
        return <div className="note">
            {this.props.note.title}
            <span>
                <button id="edit" onClick={this.edit}><FaBeer />
                </button>
                <button id="remove" onClick={this.remove}>Delete</button>
            </span>
        </div>;
    }



  render() {
      console.log('Render')
    if(this.state.isEdit){
        return this.renderEditNote();
    }
    return this.renderNote()
  }
}

export default Note;
