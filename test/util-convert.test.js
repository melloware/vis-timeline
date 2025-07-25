import assert from "assert";

import util from "../lib/util.js";
import moment from "moment";

var ASPDateRegex = /^\/?Date\((\-?\d+)/i;

describe("util", function() {
  describe("convert", function() {
    it("handles null", function() {
      assert.equal(util.convert(null), null);
    });

    it("handles undefined", function() {
      assert.equal(util.convert(undefined), undefined);
    });

    it("undefined type returns original object", function() {
      assert.deepEqual(util.convert({}), {});
    });

    it("non-string type throws", function() {
      assert.throws(
        function() {
          util.convert({}, {});
        },
        Error,
        null
      );
    });

    it("converts to boolean", function() {
      assert(util.convert({}, "boolean"));
    });

    it("converts to number", function() {
      assert.equal(typeof util.convert("1198908717056", "number"), "number");
    });

    it("converts to String", function() {
      assert.equal(typeof util.convert({}, "string"), "string");
    });

    it("converts to Date from Number", function() {
      const d1 = util.convert(1198908717056, "Date");
      assert(d1 instanceof Date);
      assert(!isNaN(d1.valueOf()));
    });

    it("converts to Date from epoch int stored as String", function() {
      const d1 = util.convert("1198908717056", "Date");
      assert(d1 instanceof Date);
      assert(!isNaN(d1.valueOf()));
    });

    it("converting epoch int stored as String === epoch int stored as int", 
      function() {
        const d1 = util.convert("1198908717056", "Date");
        const d2 =  util.convert(1198908717056, "Date");
        assert.strictEqual(d1.valueOf(), d2.valueOf());
      }
    );

    it("converts ISO dates to midnight in local TZ", function() {
      const dateISO = util.convert("2020-04-20", "Date");
      const dttmISO = util.convert("2020-04-20T00:00:00", "Date");

      assert(dateISO instanceof Date);
      assert(dttmISO instanceof Date);

      assert(!isNaN(dateISO.valueOf()));
      assert(!isNaN(dttmISO.valueOf()));

      assert.strictEqual(dateISO.valueOf(),dttmISO.valueOf());
    });

    it("converts to Date from Moment", function() {
      assert(util.convert(new moment(), "Date") instanceof Date);
    });

    it("throws when converting unknown object to Date", function() {
      assert.throws(
        function() {
          util.convert({}, "Date");
        },
        TypeError,
        null
      );
    });

    it("converts to Moment from Number", function() {
      assert(util.convert(1198908717056, "Moment") instanceof moment);
    });

    it("converts to Moment from String", function() {
      assert(
        util.convert("2007-12-29T06:11:57.056Z", "Moment") instanceof moment
      );
    });

    it("converts to Moment from Date", function() {
      assert(util.convert(new Date(), "Moment") instanceof moment);
    });

    it("converts to Moment from Moment", function() {
      assert(util.convert(new moment(), "Moment") instanceof moment);
    });

    it("throws when converting unknown object to Moment", function() {
      assert.throws(
        function() {
          util.convert({}, "Moment");
        },
        TypeError,
        null
      );
    });

    it("converts to ISODate from Number", function() {
      assert(util.convert(1198908717056, "ISODate") instanceof Date);
    });

    it("converts to ISODate from String", function() {
      assert.equal(typeof util.convert("1995-01-01", "ISODate"), "string");
    });

    it("converts to ISODate from Date - Throws a deprecation warning", function() {
      assert.equal(typeof util.convert(new Date(), "ISODate"), "string");
    });

    it("converts to ISODate from Moment", function() {
      assert.equal(typeof util.convert(new moment(), "ISODate"), "string");
    });

    it("throws when converting unknown object to ISODate", function() {
      assert.throws(
        function() {
          util.convert({}, "ISODate");
        },
        Error,
        null
      );
    });

    it("converts to ASPDate from Number", function() {
      assert(ASPDateRegex.test(util.convert(1198908717056, "ASPDate")));
    });

    it("converts to ASPDate from String", function() {
      assert(ASPDateRegex.test(util.convert("1995-01-01", "ASPDate")));
    });

    it("converts to ASPDate from Date", function() {
      assert(ASPDateRegex.test(util.convert(new Date(), "ASPDate")));
    });

    it("converts to ASPDate from ASPDate", function() {
      assert(ASPDateRegex.test(util.convert("/Date(12344444)/", "ASPDate")));
    });

    it("converts to ASPDate from Moment", function() {
      assert(ASPDateRegex.test(util.convert(new moment(), "ASPDate")));
    });

    it("throws when converting unknown object to ASPDate", function() {
      assert.throws(
        function() {
          util.convert({}, "ASPDate");
        },
        Error,
        null
      );
    });

    it("throws when converting unknown type", function() {
      assert.throws(
        function() {
          util.convert({}, "UnknownType");
        },
        Error,
        null
      );
    });
  });
});
