# swapd

_A Skill Swapping Web Application_

## Stack:
* Node
* Express
* PostgreSQL
* Sequelize
* React
* Redux
* Socket.io
* MaterialUI

## Description:

Users can create profiles listing services they would be willing to share.

Other personal data that can be updated includes:
* interests
* email
* phone number
* max travel distance
* zipcode
* bio

Once offering a service, users can search for services to request. The resulting list of user's services from the search are weighted by service ratings, user overall ratings, and number of coinciding interests.  If search results are null, then the search returns a closest match.

If a user (requester) finds a service they would like to swap for, they click 'request swap'.  This opens a form to select a service to offer in return and a chance to send an initial message.  The other user(responder) who is initially contacted for a swap has an option to change the service they would like in return.  If that responder agrees to terms set while messaging, they can confirm the swap.

Users can check their messages link in the nav bar to see if they have any pending, active, or closed swaps.  They can access their separate chats through this list.

After a swap is completed, both users are prompted at the bottom of their home screens to post a rating and review for the other's service.

## Future goals:

* cancel swap
* set date with calendar
* three way swap
* delete skills and interests
* add location preferences as a weight to the search
* allow users to upload images
* send emails to users upon request and to prompt reviews
