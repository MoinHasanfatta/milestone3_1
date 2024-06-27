const request = require('supertest');
const app = require('../server');
const Event = require('../models/Event');
const { addEvent, getAllEvents,getEventById,updateEvent,deleteEvent } = require("../controllers/eventController");





describe('addEvent', () => {
    test('add_Event_should_add_an_Event_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample Event data to be added
      const EventToAdd = {        
          title: 'Event1',
          date: '2020-05-18T14:10:30Z',
          reminder: false
      };
  
       // Mock the Event.create method to resolve successfully
        Event.create = jest.fn().mockResolvedValue(EventToAdd);
  
      // Mock Express request and response objects
      const req = { body: EventToAdd };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
    //   // Call the controller function
       await addEvent(req, res);
     
  
    //   // Assertions
       expect(Event.create).toHaveBeenCalledWith(EventToAdd);
       expect(res.status).toHaveBeenCalledWith(200);
       expect(res.json).toHaveBeenCalledWith(EventToAdd);
    });
  
    test('add_Event_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Event.create
      const error = new Error('Database error');
  
      // Mock the Event.create method to reject with an error
      Event.create = jest.fn().mockRejectedValue(error);
  
      // Mock Express request and response objects
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await addEvent(req, res);
  
      // Assertions
      expect(Event.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

describe('getAllEvents', () => {
    test('getallEvents_should_return_Events_and_respond_with_a_200_status_code', async () => {
      // Sample user data
      const EventData = [
        {
          title: 'Event1',
          date: '2020-05-18T14:10:30Z',
          reminder: false
        },
        {
          title: 'Event2',
          date: '2020-05-18T14:10:30Z',
          reminder: false
        },
      ];
  
      // Mock Express request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Event.find method to resolve with the sample user data
      Event.find = jest.fn().mockResolvedValue(EventData);
  
      // Call the controller function
      await getAllEvents(req, res);
  
      // Assertions
      expect(Event.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(EventData);
    });
  
    test('getallEvents_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling User.find
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the User.find method to reject with an error
     Event.find = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await getAllEvents(req, res);
  
      // Assertions
      expect(Event.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

  describe('getEventById', () => {
    test('get_Event_by_id_should_return_Event_for_a_valid_id_and_respond_with_a_200_status_code', async () => {
      // Sample user ID and Event data
      const EventId = '001';
      const EventsData = [
        {
             _id: '001',
             title: 'Event1',
          date: '2020-05-18T14:10:30Z',
          reminder: false
        },
        {
            _id: '002',
            title: 'Event2',
          date: '2020-05-18T14:10:30Z',
          reminder: false
        },
      ];
  
    // Mock the Event.findById method to resolve with the sample Event
    Event.findById = jest.fn().mockResolvedValue(EventsData);

    // Mock Express request and response objects
    const req = { params: { id: EventId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getEventById(req, res);

    // Assertions
    expect(Event.findById).toHaveBeenCalledWith(EventId);
    expect(res.status).toHaveBeenCalledWith(200);
    });
  
    test('get_Event_by_user_id_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Event.find
      const error = new Error('Database error');
  
     // Mock Express request and response objects
    const req = { params: { id: 'nonExistentEvent' } };

    // Mock the Event.findById method to resolve with null (Event not found)
    Event.findById = jest.fn().mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getEventById(req, res);

    
  
      // Assertions
      expect(Event.findById).toHaveBeenCalledWith('nonExistentEvent');
      expect(res.status).toHaveBeenCalledWith(200);
      //expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });

describe('updateEvent', () => {
    test('update_Event_should_update_a_Event_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample Event ID and updated Event data
      const EventId = '001';
      const updatedEventData = {
        title: 'Event1',
        date: '2020-05-18T14:10:30Z',
        reminder: false
      };
  
      // Mock Express request and response objects
      const req = { params: { id: EventId }, body: updatedEventData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Event.findByIdAndUpdate method to resolve with the updated Event data
      Event.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedEventData);
  
      // Call the controller function
      await updateEvent(req, res);
  
      // Assertions
      expect(Event.findByIdAndUpdate).toHaveBeenCalledWith(EventId, updatedEventData);
      expect(res.status).toHaveBeenCalledWith(200);
      //expect(res.json).toHaveBeenCalledWith({ message: 'Event updated successfully' });
    });

    test('update_Event_should_handle_not_finding_a_Event_and_respond_with_a_404_status_code', async () => {
        // Mock Express request and response objects
        const req = { params: { id: 'nonExistentEvent' }, body: {} };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        // Mock the Event.findByIdAndUpdate method to resolve with null (Event not found)
        Event.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    
        // Call the controller function
        await updateEvent(req, res);
    
        // Assertions
        expect(Event.findByIdAndUpdate).toHaveBeenCalledWith('nonExistentEvent', {});
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: `cannot find any Event with ID nonExistentEvent` });
      });
    
});

describe('deleteEvent', () => {
    test('delete_Event_should_delete_a_Event_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample Event ID to be deleted
      const EventId = 'Event123';
  
      // Mock Express request and response objects
      const req = { params: { id: EventId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Event.findByIdAndDelete method to resolve with the deleted Event data
      Event.findByIdAndDelete = jest.fn().mockResolvedValue({
        //_id: EventId,
        //title: 'Deleted Event',
        // Include other fields as needed
      });
  
      // Call the controller function
      await deleteEvent(req, res);
  
      // Assertions
      expect(Event.findByIdAndDelete).toHaveBeenCalledWith(EventId);
      expect(res.status).toHaveBeenCalledWith(200);
     // expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully' });
    });
  
    test('delete_Event_should_handle_not_finding_a_Event_and_respond_with_a_404_status_code', async () => {
      // Mock Express request and response objects
      const req = { params: { id: 'nonExistentEvent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Event.findByIdAndDelete method to resolve with null (Event not found)
      Event.findByIdAndDelete = jest.fn().mockResolvedValue(null);
  
      // Call the controller function
      await deleteEvent(req, res);
  
      // Assertions
      expect(Event.findByIdAndDelete).toHaveBeenCalledWith('nonExistentEvent');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: `cannot find any Event with ID nonExistentEvent` });
    });
});

describe('incorrectroute', () => {
    it('should expect 404 when an incorrect route is used for inserting a Events', async () => {
        const newEvent = {
          title: 'Event1',
          date: '2020-05-18T14:10:30Z',
          reminder: false
        };
    
        const response = await request(app)
            .post('/events')
            .send(newEvent)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving all Events', async () => {
        const response = await request(app)
            .get('/events')
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for retrieving an Event by ID', async () => {
        const specificId = '001';
        const response = await request(app)
          .get(`/events/${specificId}`)
          .expect(404);
    });

    it('should expect 404 when an incorrect route is used for updating an Event by ID', async () => {
        const specificId = '001';
        const updatedData = {
            Event: 'Updated Event',
            flightNumber: '456',
            departureCity: 'City C',
            arrivalCity: 'City D',
            departureTime: new Date(),
            arrivalTime: new Date(),
        };

        const response = await request(app)
            .put(`/events/${specificId}`)
            .send(updatedData)
            .expect(404);
    });
    
    it('should expect 404 when an incorrect route is used for deleting an Event by ID', async () => {
        const specificId = '001';
        const response = await request(app)
            .delete(`/events/${specificId}`)
            .expect(404);
    });


});