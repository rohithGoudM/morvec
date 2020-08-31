import React from 'react';
import ReactPlayer from 'react-player';

const Login = ()=>{
    const revs=[];
    const reviews = [
        {
            img:"./alc.jpg",
            review: "This is the story of a boy named Santiago who was a shepherd and kept dreaming the same dream and was very curious to make it come true. In the introduction itself readers will feel connected with the boy. I got connected after reading only 20-25 pages, which happens rarely. He decided to follow his dream and he met a king in his path who directed him towards his own dreams, and from there the actual story begins. He started his journey by scarifying his sheep. In his very own journey he experiences love, friendship, money loss, learns language of world, struggles. On his journey, he met an old king who already knew his past, and he directed him towards the treasure in Egypt which he always dreamt about. His journey was full of adventures and lessons which life taught. He also met one Englishman who taught him what Alchemist mean and in the last phase of his journey he actually met The Alchemist who made him believe in himself, who convinced him to follow his dream, to obey his heart, even if he got caught in the tribal war of the desert, even if his hard earned money had been stolen. After crossing all the odds, finally he reached to his destination, but there also he got beaten by thief. After all struggle did he find his treasure?",
            link: "https://amzn.to/2UpazzN"
        },
        {
            img:"./ggb.jpeg",
            review:"Still the brightest boy in the class, Scott Fitzgerald holds up his hand. It is noticed that his literary trousers are longer, less bell-bottomed, but still precious. His recitation concerns Daisy Fay who, drunk as a monkey the night before she married Tom Buchanan, muttered: “Tell ’em all Daisy’s chang’ her mind.” A certain penniless Navy lieutenant was believed to be swimming out of her emotional past. They gave her a cold bath, she married Buchanan, settled expensively at West Egg, L. I., where soon appeared one lonely, sinister Gatsby, with mounds of mysterious gold, ginny habits and a marked influence on Daisy. He was the lieutenant, of course, still swimming. That he never landed was due to Daisy’s baffled withdrawal to the fleshly, marital mainland. Due also to Buchanan’s disclosure that the mounds of gold were ill-got. Nonetheless, Yegg Gatsby remained Daisy’s incorruptible dream, unpleasantly removed in person toward the close of the book by an accessory in oil-smeared dungarees.",
            link:"https://amzn.to/2XOtRRk"
        },
        {
            img:"./gdt.jpeg",
            review:"A missing girl. One of the wealthiest families in Sweden. A journalist on the wrong side of the law. A twenty-four-year-old pierced and tattooed genius hacker. And of course, a flower for every year. Larsson’s first in the Millenium series. Readers definitely knew it was a thriller. The author did not shy away from suspense or dramatic plot twists. “I had fun reading it because it was so intense.” says Ethan, a member of the ISZL Book Club. These scenes had such an impact because of the characters Larsson created. They were vivid and complex people, a balance of earnestness and wit. One of the criticisms for this book was how long it took for readers to get into the story. Larsson spends a lot of time establishing setting and context. For such a complex plot and character list, this is understandable and maybe even unavoidable. “But then it picked up, and I enjoyed it.” says Emily, another member. There are themes of grief, passion and the nature of crime threaded throughout this debut novel. Readers were constantly guessing of whether or not Harriet will be found, dead or alive. The author has left a striking legacy. It is a must-read for all crime fiction fans. At its core is the true essence of detection – working as a team for the common good.",
            link:"https://amzn.to/3dPeVYL"
        }
    ];

    const fetchit = ()=>{
        fetch('http://Livelearning-env.eba-muyzbq7g.ap-south-1.elasticbeanstalk.com/get'/*, {mode:'cors'}*/,{
            method:"get", 
            headers:{
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE1OTg4NzAyNTMsImlhdCI6MTU5ODg1MjI1M30.STrqjsAGt-RpTo02DHRh6-s52OjZlVT4rkSlsZ5igCe1uKC4rTCqNuEFSPvJ6T2mV35-srDd2623oFCd_u357A",
                "Content-Type": "application/json"
            }
        }).then(result=>{      
            console.log(result);
        });
    }

    return(
        <div className="container" >
            <div className="container text-center">
                <h1 className="bd-title" >Sign In/Up</h1>
                <p className="lead text-muted">
                    Soon to be Awesome. Something attractive.
                </p>
                <p>
                    <a href="/auth/google" className="btn btn-dark my-2">Sign In with Google</a>
                </p>

            </div>
            <div className="col-md-3" onClick={()=>fetchit()}>
                <img src="/alc.jpg" width="100" />
            </div>
            <div className="col-md-8 offset-md-2 p-0 ">
                <ReactPlayer url="https://www.youtube.com/watch?v=UvfE5yGMs54" controls={true} width="100%" />
            </div>
            {revs.map((er,ind)=>{
                return (
                    <div key={ind} className="row p-5">
                        <div className="col-lg-2 my-5">
                            <img className="img-fluid" src={er.img} />
                        </div>
                        <div className="col-lg-10 p-3">
                            <p>{er.review}</p>
                            <a href={er.link} target="blank" >{er.link}</a>
                        </div>
                    </div>
                )
            })}            
        </div>

        )
}


export default Login;