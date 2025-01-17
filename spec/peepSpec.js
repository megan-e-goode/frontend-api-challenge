describe("Peep", function() {
  var peep;

  beforeEach(function() {
    peep = new Peep();
  });

  it("can create a new peep", function() {
    expect(peep instanceof Peep).toBe(true);
  });

  describe("#getPeeps", function() {
    it("calls its callback", function() {
      spyOn($, "ajax").and.callFake(function(options) {
        options.success();
      });
      var callback = jasmine.createSpy();
      peep.getPeeps('', callback);
      expect(callback).toHaveBeenCalled();
    });

    it("can get all peeps", function() {
      var displayMock = jasmine.createSpy('displayMock');
      peep.getPeeps('', displayMock);
      expect(peep._result instanceof Array).toBe(true)
    });

    // it("can get a single peep", function() {
    //   var value = [];
    //
    //   var peepFunc = {
    //     getPeeps: function() {
    //       value.push({"id":807,"body":"Persister test peep","created_at":"2019-06-14T15:01:04.614Z","updated_at":"2019-06-14T15:01:04.614Z","user":{"id":1052,"handle":"Zoe"},"likes":[]});
    //     }
    //   }
    //
    //   spyOn(peepFunc, 'getPeeps');
    //   peepFunc.getPeeps;
    //   expect(value.length).toEqual(1);
    // });
  });

  describe("#postPeep", function() {
    it("can post a peep", function() {
      var userId, body;

      peep = {
        post: function(user_id, msg_body, session_key) {
          userId = user_id;
          body = msg_body;
          sessionKey = session_key;
        },
        getId: function() {
          return userId;
        },
        getBody: function() {
          return body;
        }
      }

      spyOn(peep, 'getId');
      spyOn(peep, 'getBody');
      peep.post(1, "Message body", "qwerty");
      expect(userId).toEqual(1);
      expect(body).toEqual("Message body");
    });
  });
});
