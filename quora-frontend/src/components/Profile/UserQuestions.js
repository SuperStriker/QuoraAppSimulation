import React, {Component} from 'react';

import Header from '../Header/Header';
import ProfileNav from '../Profile/profileNav';
import Credentials from '../Profile/Credentials';
import {rooturl} from '../../config/settings';
import UserInfo from '../Profile/UserInfo';
import Button from 'react-bootstrap/Button';

import ProfileContent from '../Profile/profileContent';
import KnowsAbout from '../Profile/KnowsAbout';
import axios from 'axios';
import { ROOT_URL } from '../../config/URLsettings';

//Create a Main Component
export default class UserFollowers extends Component {

    constructor(props) {
        super(props);
        let _isMounted = false;
        this.state = {
            Email: 'akhil.ramesh@gmail.com',
            Name : localStorage.getItem('name'),
            token : localStorage.getItem('token'),
           // Name: '',
            City: '',
            State: '',
            ZipCode: '',
            Profile: '',
            Education: '',
            CareerInformation: '',
            Description: '',
            ProfileCredential: '',
            Questions: [],
            QuestionsFollowed: [],
            AnswersBookmarked : [],
            Topics : [],
            Followers : [],
            Following : [],
            ProfileViews : '',
            QuestionsAnswered: [],
        };
    
        this.addpicture = this.addpicture.bind(this);
        this.savepicture = this.savepicture.bind(this);
    }

    addpicture = (e) => {
        if (e.target.name === 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        }
    }

    componentDidMount(){

        axios.get(ROOT_URL +`/getProfile/${this.state.Email}`, {
             headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
         }).then((response) => {
          var  data = response.data;
          console.log(response.data);
           //update the state with the response data
          
           this.setState({
             /*Email: 'akhil.ramesh@gmail.com',
             Name : localStorage.getItem('name'),
             token : localStorage.getItem('token'), */
            // Name: '',
             City: data.City,
             State: data.State,
             ZipCode: data.ZipCode,
             Profile: data.Profile,
             Education: data.Education,
             CareerInformation: data.CareerInformation,
             Description: data.Description,
             ProfileCredential: data.ProfileCredential,
             Questions: data.Questions,
             QuestionsFollowed: data.QuestionsFollowed,
             AnswersBookmarked : data.QuestionsAnswered,
             Topics : data.Topics,
             Followers : data.Followers,
             Following : data.Following,
             //ProfileViews : '',
             QuestionsAnswered: data.QuestionsAnswered,
           });
         });
            
     }

    savepicture = (e) =>
{
  
    const desc = this.props.profile.name;

    const  data  = Object.assign({},this.state);

    //const { files } = this.state;
    let formData = new FormData();
    console.log(desc);
    console.log(data.selectedFile);

    formData.append('description', desc);
    formData.append('selectedFile', data.selectedFile);
 

    axios.post(`http://'+rooturl+':4000/addpic`, formData)
    .then((result) => {
      this.setState({selectedFile : ''});
      this.componentDidMount();
  });
   

}

    render(){
        return(
            <div>
           <Header/>
           <div className = 'row' style = {{width : 1000 , height : 200}}>
           <div className = 'col-sm-3' > 
           <img src={this.state.profilepic}
           
           className="image--cover" /> 
          
           
            <form>
          <div className="form-group" style = {{width : 200}}>
              <input type="file" className="form-control-file" name="selectedFile" onChange={this.addpicture} /> 

              <Button style = {{width : 200}}
  block
  type="button"  onClick = {this.savepicture} >
Save Profile Picture
</Button>   </div> 

 </form>
           </div>
           <div  className = 'col-sm-5' >  <UserInfo/> </div> 
           <div className = 'col-sm-4' style = {{left : 300}}> <Credentials/> </div> 
           </div>
           <div className = 'row'>
           <div className = 'col-sm-2' ><ProfileNav/> </div>
           <div className = 'col-sm-6' > <ProfileContent/> </div>
           <div><KnowsAbout/></div>
          
           </div>
           
           </div>
        )
    }
}