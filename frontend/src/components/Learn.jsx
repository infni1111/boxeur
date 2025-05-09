import React from 'react';

import './learn.css'



const Table = ()=>{

  const click = ()=>{
    console.log("click dans le composant Learn")
  }
  return(

    <div
    className="div_table"
    > 
      

      <ol>
          <li onClick = {click} className ="titre_table_principale">Introduction à la cryptographie</li>
         
               <ul>

                  <li onClick = {click} className ="titre_table_secondaire">Chiffrement</li>
                  <li onClick = {click} className ="titre_table_secondaire">Encodage</li>
                  <li onClick = {click} className ="titre_table_secondaire">Hachage</li>
                  <li onClick = {click} className ="titre_table_secondaire">Confidentialité</li>
                  <li onClick = {click} className ="titre_table_secondaire">Intégrité</li>
                  <li onClick = {click} className ="titre_table_secondaire">Authenticité</li>
                  <li onClick = {click} className ="titre_table_secondaire">Non Répudiation</li>
               
               </ul>


          <li onClick = {click} className ="titre_table_principale">Théorie des nombres et concepts mathématiques fondamentaux</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Arithmetique Modulaire</li>
                     <li onClick = {click} className ="titre_table_secondaire">Exponentiation Modulaire et application </li>
                      <li onClick = {click} className ="titre_table_secondaire">Inverse Modulaire et théorème d'Euler</li>
                
                


                </ul>


      
          <li onClick = {click} className ="titre_table_principale">Chiffrement Symétrique</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Algorithme Moderne</li>
                     <li onClick = {click} className ="titre_table_secondaire">DES</li>
                      <li onClick = {click} className ="titre_table_secondaire">AES</li>
                      <li onClick = {click} className ="titre_table_secondaire">Modes d'opérations des blocs</li>
                      <li onClick = {click} className ="titre_table_secondaire">Problèmes de distribution des clés</li>
                      <li onClick = {click} className ="titre_table_secondaire">Attaques sur le chiffrement symétrique</li>
                
                


                </ul>



          <li onClick = {click} className ="titre_table_principale">Chiffrement Asymétrique</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Différence avec le chiffrement symétrique</li>
                     <li onClick = {click} className ="titre_table_secondaire">clé public et clé privée</li>
                      <li onClick = {click} className ="titre_table_secondaire">RSA</li>
                      <li onClick = {click} className ="titre_table_secondaire">DIFFIE-HELLMAN</li>
                      <li onClick = {click} className ="titre_table_secondaire">COURBES ELLIPTIQUES</li>
                      <li onClick = {click} className ="titre_table_secondaire">Attaques sur le chiffrement asymétrique</li>
                
                


                </ul>

        <li onClick = {click} className ="titre_table_principale">Hachage cryptographique</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Fonction unidirectionnelle</li>
                     <li onClick = {click} className ="titre_table_secondaire">Résistance aux collisions</li>
                      <li onClick = {click} className ="titre_table_secondaire">Algorithme de hachage : MD5, SHA-1</li>
                      <li onClick = {click} className ="titre_table_secondaire">SHA-2, SHA-3</li>
                      <li onClick = {click} className ="titre_table_secondaire">Stockage des mots de passe</li>
                      <li onClick = {click} className ="titre_table_secondaire">Attaques par force brute Rainbow Tables</li>
                
                


                </ul>




        <li onClick = {click} className ="titre_table_principale">Signatures numériques et authentification</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Signatures avec chiffrement asymétrique</li>
                     <li onClick = {click} className ="titre_table_secondaire">Vérification de l'authenticité et de l'intégrité</li>
                      <li onClick = {click} className ="titre_table_secondaire">Algorithme de Signatures : RSA</li>
                      <li onClick = {click} className ="titre_table_secondaire">DSA et ECDSA</li>
                      <li onClick = {click} className ="titre_table_secondaire">Certificats numériques et PKI</li>
                      <li onClick = {click} className ="titre_table_secondaire">Autorité de certification : CA</li>
                      <li onClick = {click} className ="titre_table_secondaire">Infrastructure à la clé publique (PKI)</li>
                     
                


                </ul>




        <li onClick = {click} className ="titre_table_principale">Procoles de Sécurité et application réelles</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Sécurité de communication : SSL/TLS HTTPS</li>
                     <li onClick = {click} className ="titre_table_secondaire">VPN et chiffrement des connexions</li>
                      <li onClick = {click} className ="titre_table_secondaire">Cryptographie dans la blockchain</li>
                      <li onClick = {click} className ="titre_table_secondaire">Preuve de travail (PoW)</li>
                      <li onClick = {click} className ="titre_table_secondaire">Chiffrement des transactions</li>
                      <li onClick = {click} className ="titre_table_secondaire">Sécurisation des systèmes de messagerie</li>
                      <li onClick = {click} className ="titre_table_secondaire">Chiffrement de bout en bout (whatsapp,signal,pgp)</li>
                     
                


                </ul>



         <li onClick = {click} className ="titre_table_principale">Attaques Cryptographique et Sécurité avancée</li>
         
                
                <ul>

                     <li onClick = {click} className ="titre_table_secondaire">Attaques par dictionnaire et force brute</li>
                     <li onClick = {click} className ="titre_table_secondaire">Attaques par canal auxiliaire</li>
                      <li onClick = {click} className ="titre_table_secondaire">Algorithme quantiques et impact sur RSA</li>
                      <li onClick = {click} className ="titre_table_secondaire">Post-quatum cryptography</li>
                     
                


                </ul>








         

      </ol>


    </div>
    )
}



const Intro_Crypto =()=>{


  return(

    <div
    className = "div_intro_crypto"
    >
      <h3> Introduction à la Cryptographie </h3>

      <div
      className = "text_intro_crypto"
      >

        La cryptographie est l'art et la science de sécuriser les informations en les transformant de manière à ce qu'elles ne soient lisibles que par les personnes autorisées. Elle repose sur des principes mathématiques et des algorithmes permettant de protéger la confidentialité, l'intégrité, l'authenticité et la non-répudiation des données.

Objectifs principaux de la cryptographie :
<p className ="def">Confidentialité</p>  Assurer que seules les personnes autorisées puissent accéder à certaines informations. Par exemple, lorsqu'un message est envoyé entre deux personnes, la cryptographie permet de le rendre incompréhensible pour toute personne qui pourrait intercepter la communication.

 <p className ="def">Intégrité</p> Garantir que les données n'ont pas été modifiées en cours de transmission. Par exemple, s'il y a une altération du message en transit, la cryptographie permet de détecter ce changement.

<p className ="def">Authenticité</p>  Vérifier l'identité des personnes qui échangent des informations. Par exemple, lorsqu'un utilisateur se connecte à un service, la cryptographie peut être utilisée pour vérifier qu'il est bien celui qu'il prétend être.

<p className ="def">Non-répudiation</p> S'assurer qu'une fois une action effectuée (comme un message envoyé ou un contrat signé), l'expéditeur ne peut pas nier l'avoir fait. Cela est souvent réalisé via des signatures numériques.

      </div>
      
    </div>
    )

}

const AES = ()=>{
  return(
    <div
    className = "div_aes"
    >

      <h3>Chiffrement AES</h3>

      <div
      className = "text_aes"
      >
 L'AES (Advanced Encryption Standard) est un algorithme de chiffrement symétrique largement utilisé pour protéger les données sensibles. Il remplace le DES (Data Encryption Standard), qui était plus ancien et plus vulnérable. AES a été adopté par le gouvernement des États-Unis en 2001 et est maintenant utilisé à l'échelle mondiale pour le chiffrement des données.

 Principe de base de l'AES :

 Le chiffrement AES est basé sur un chiffrement symétrique, ce qui signifie que la même clé est utilisée à la fois pour le chiffrement et le déchiffrement des données. Le processus consiste à appliquer plusieurs étapes de transformation aux données (appelées blocs) en utilisant la clé secrète. Il existe différent mode

 <p className = "def">CBC</p>
 infni



      </div>
    </div>
    )
}

const Learn = () => {
  console.log("petit test dans le composant Learn");

  return (
    <>

      <div
      className ="div_container_learn"
      >

        <Table />

        <Intro_Crypto />  

        <AES />
      </div>
    </>
  );
};

export default Learn;
