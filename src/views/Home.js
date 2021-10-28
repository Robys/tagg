import Signup from "../components/Signup"
import {HomeContent,FAQ,Footer} from "../utils/SiteContent"
import {Box} from '@material-ui/core'
import headergif from '../imgs/tagg-logo.gif'

/**
 * Home page, contain basic information of the application and the signup form.
 */

function Home (){

    return (
        <div className="home">

            <img src={headergif} loop="infinite" className="home-promo"/>

            <Signup/>
            <HomeContent/>
            <FAQ/>

            <Footer/>

        </div>
    )
}


export default Home