import react from 'react'
import './profile.css'

class Userprofilecard extends react.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
             <div class="profile_card">
                <div class="profile-card-img">
                   <img src={this.props.image} alt="" />
                </div>

                <div class="profile-card-contact">
                   <h4 class="profile_name">{this.props.name}</h4>

                   <div>
                   <h6 class="profile_age">{this.props.age}</h6>
                   <p class="profile_gender">{this.props.gender}</p>
                   <p class="profile_contact">{this.props.contact}</p>
                   <p class="profile_contact">{this.props.course}</p>
                    <div class="profile_email">
                   <p >{this.props.email}</p>
                    </div>
                   </div>

                </div>
                 
             </div>
        )
    }
}

export default Userprofilecard;