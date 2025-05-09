import {useState} from 'react'
import ordinateur from '../assets/images/ordinateur.jpg'; 
import python from '../assets/images/python.jpg'
import react from '../assets/images/react.svg'
import marketing from '../assets/images/marketing.jpg'
import sql from '../assets/images/sql.jpg'
import shopify from '../assets/images/shopify.jpg'
import business from '../assets/images/business.jpg'
import js from '../assets/images/js.jpg'
import photoshop from '../assets/images/photoshop.jpg'
import html from '../assets/images/html.jpg'



import './flyrs.css'


const Image = ({src,className})=>{

	return(<div>

		<img className ={className} src = {src} />


		</div>)

}


const Text =({text,className})=>{
	return(
		<div className={className}>
			{text}

		</div>
		)
}








const list_icone ={
	python:python,
	js:js,
	marketing:marketing,
	sql:sql,
	business:business,
	shopify:shopify,
	html:html,
	photoshop:photoshop,
	react:react,
	dev:ordinateur,
}


const Titre=({Icon_name,size,color,className,text})=>{


	const IconComponent = list_icone[Icon_name]
	return(
		<div className={className}>

			<img src = {list_icone[Icon_name]} className="icon_image" />
			
			<div>
				{text}
			</div>

		</div>
		)
}


const Flyrs = ()=>{


	return(

		//Div principale
		<div
		className="container"
		>	


			{/* Section entete */}

			<div
			className="entete"
			>
				{/* section bienvenu url */}

				<div
				className="bienvenue"
				>

					<Text text="formation" className="formation rotation" />


					<div
					className="droit rotation"
					>
						<Text text="en" className="en" />
						<Text text="informatique" className="informatique" />



					</div>

				</div>



				{/*section ordinateur */}
				<div>

					<Image src={ordinateur} className="ordinateur" />


				</div>




				{/* Proposé par */}

				<div
				className="dg"
				>

					

				</div>

				

				<div
				className="div_propose"
				>
					{/* 
						
					<Text text="par Mme : " className="propose" />
					<Text text=" Lory " className="alaka center" />

					*/}


				</div>







			</div>





			{/* section milieu */ }
			<div
			className="div_titre"
			>

					<Text text="Profitez" className="profitez center" />
				<Text text="des meilleures formations tech dans le " className="meilleure" />



			</div>


			<div
			className="div_domaine"
			>
				<div
				className="domaine"
				>
					{/*Icon_name,size,color,className,text*/}
					

					<Titre Icon_name="dev" size={20} color="blue" text="Developpement web" className="domaine_titre" />
					<Titre Icon_name="html" size={20} color="red" text="html, css" className="domaine_element" />
					<Titre Icon_name="js" size={20} color="red"   text="JavaScript" className="domaine_element" />
					<Titre Icon_name="python" size={20} color="red" text="python" className="domaine_element" />
					<Titre Icon_name="sql" size={20} color="red" text="sql" className="domaine_element" />
					<Titre Icon_name="react" size={20} color="red"  text="react" className="domaine_element" />
					


				</div>

			</div>




			<div
			className="div_domaine2"
			>


				<div
				className="domaine02"
				>
					<Text text="+237 690 22 38 11" className="numero" />

					<Text text="+229 62 01 37 62 " className="numero" />






				</div>
				<div
				className="domaine2"
				>
					{/*Icon_name,size,color,className,text*/}
					

					<Titre Icon_name="business" size={20} color="blue" text="Marketing digitale" className="domaine_titre" />
					<Titre Icon_name="marketing" size={20} color="red" text="Web builder" className="domaine_element" />
					<Titre Icon_name="photoshop" size={20} color="red" text="photoshop" className="domaine_element" />
					<Titre Icon_name="shopify" size={20} color="red"  text="shopify" className="domaine_element" />
					


				</div>

			</div>


			<div
			className="div_prix"

			>  
				<Text text="Categorie" className="Categorie bloc red" />
				<Text text="Prix (fcfa)" className="bloc2 bloc red" />
				<Text text="Duree " className="bloc3 bloc red" />
				<Text text="Certifications" className="bloc4 bloc red" />
				
                
				<Text text="Basique" className="basique bloc red" />
				<Text text="5 000" className="bloc2 bloc" />
				<Text text="1 mois" className="bloc3 bloc" />
				<Text text="" className="bloc4 bloc" />
				


				<Text text="Premium" className="basique bloc red" />
				<Text text="10 000" className="bloc2 bloc" />
				<Text text="3 mois" className="bloc3 bloc" />
				<Text text="udemy" className="bloc4 bloc" />
			
			    
				

				<Text text="VIP" className="basique bloc red" />
				<Text text="50 000" className="bloc2 bloc" />
				<Text text="6 mois" className="bloc3 bloc" />
				<Text text="Coursera" className="bloc4 bloc" />
			
			    
				
			    
				



			</div>

      		


		</div>

		)
}


export default Flyrs;