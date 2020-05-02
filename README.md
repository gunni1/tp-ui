# Konzepte
## Favoritiserte Trainingspläne
- Je Benutzer wird eine Liste mit favorisierten Trainingsplänen geführt
- Jeder Trainingsplan eines beliebigen Benutzers kann zu den eigenen Trainingsplanfavoriten hinzugefügt werden (teilen)

## Meine Trainingspläne
- In der Übersicht "Meine Trainingspläne" werden alle von mir erstellten Pläne angezeigt
- In der Vorausswahl werden zusätzlich auch alle Pläne anderer angezeigt, die als favoriten markiert wurden



# Notes
`ng serve --proxy-config proxy.conf.json`

Trapla - Trainingsplan

## Create Cognito Auth with amplifiy
Install 
- aws-amplify-angular
- aws-amplify

Setup Amplify for the project
`amplify init`

Add authentication (create UserPool via amplify cli)
`amplify add auth`

Execute Resource Creation 
`amplify push`

List environments
`amplify env list`

Change environments
`amplify checkout <env>`

