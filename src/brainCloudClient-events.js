
export function BCEvents() {
    var bc = this;

	bc.event = {};

	bc.SERVICE_EVENT = "event";

	bc.event.OPERATION_SEND = "SEND";
	bc.event.OPERATION_UPDATE_EVENT_DATA = "UPDATE_EVENT_DATA";
	bc.event.OPERATION_DELETE_INCOMING = "DELETE_INCOMING";
	bc.event.OPERATION_DELETE_SENT = "DELETE_SENT";
	bc.event.OPERATION_GET_EVENTS = "GET_EVENTS";


	/**
	 * Sends an event to the designated player id with the attached json data.
	 * Any events that have been sent to a player will show up in their
	 * incoming event mailbox. If the in_recordLocally flag is set to true,
	 * a copy of this event (with the exact same event id) will be stored
	 * in the sending player's "sent" event mailbox.
	 *
	 * Note that the list of sent and incoming events for a player is returned
	 * in the "ReadPlayerState" call (in the BrainCloudPlayer module).
	 *
	 * Service Name - Event
	 * Service Operation - Send
	 *
	 * @param toProfileId The id of the user who is being sent the event
	 * @param eventType The user-defined type of the event.
	 * @param eventData The user-defined data for this event encoded in JSON.
	 * @param callback The method to be invoked when the server response is received
	 */
	bc.event.sendEvent = function(toProfileId, eventType, eventData, callback) {
		var message = {
			toId: toProfileId,
			eventType: eventType,
			eventData: eventData
		};

		bc.brainCloudManager.sendRequest({
			service: bc.SERVICE_EVENT,
			operation: bc.event.OPERATION_SEND,
			data: message,
			callback: callback
		});
	};

	/**
	 * Updates an event in the player's incoming event mailbox.
	 *
	 * Service Name - Event
	 * Service Operation - UpdateEventData
	 *
	 * @param evId The event id
	 * @param eventData The user-defined data for this event encoded in JSON.
	 * @param callback The method to be invoked when the server response is received
	 */
	bc.event.updateIncomingEventData = function(evId, eventData, callback) {
		var message = {
			evId: evId,
			eventData: eventData
		};
		bc.brainCloudManager.sendRequest({
			service: bc.SERVICE_EVENT,
			operation: bc.event.OPERATION_UPDATE_EVENT_DATA,
			data: message,
			callback: callback
		});
	};

	/**
	 * Delete an event out of the user's incoming mailbox.
	 *
	 * Service Name - Event
	 * Service Operation - DeleteIncoming
	 *
	 * @param evId The event id
	 * @param callback The method to be invoked when the server response is received
	 */
	bc.event.deleteIncomingEvent = function(evId, callback) {
		bc.brainCloudManager.sendRequest({
			service: bc.SERVICE_EVENT,
			operation: bc.event.OPERATION_DELETE_INCOMING,
			data: {
				evId: evId
			},
			callback: callback
		});
	};

	/**
	 * Get the events currently queued for the user.
	 *
	 * Service Name - Event
	 * Service Operation - GetEvents
	 *
	 * @param callback The method to be invoked when the server response is received
	 */
	bc.event.getEvents = function(callback) {
		bc.brainCloudManager.sendRequest({
			service: bc.SERVICE_EVENT,
			operation: bc.event.OPERATION_GET_EVENTS,
			data: null,
			callback: callback
		});
	};

}

BCEvents.apply(window.brainCloudClient = window.brainCloudClient || {});
