import Immutable from './immutable';

describe('Immutable', () => {
    let value, exception;
    const IS_EQUALS = true;

    function createImmutable(v) {
        return () => {
            exception = undefined;
            value = Immutable(v);
        };
    }

    function assignKeyValue(key, val) {
        return () => {
            try {
                value[key] = val; 
            } catch (e) {
                exception = e.message;
            }
        };
    }

    function pushValue(val) {
        return () => {
            try {
                value.push(val); 
            } catch (e) {
                exception = e.message;
            }
        };
    }

    function setValueAt(val, idx) {
        return () => {
            try {
                value[idx] = val; 
            } catch (e) {
                exception = e.message;
            }
        };
    }

    function checkKeyValue(isEquals, key, val) {
        const validate = isEquals
            ? expected => expected.to.equal(val)
            : expected => expected.to.not.equal(val);
        return () => {
            validate(expect(value[key]));
        };
    }

    function isExceptionDefined() {
        expect(exception).to.be.defined;
    }

    function checkSize(val) {
        return () => {
            expect(value).to.have.length(val);
        };
    }

    function checkValueAt(val, idx) {
        return () => {
            expect(value[idx]).to.equal(val);
        };
    }

    describe('Immutable object cannot be assignable', () => {
        it('Given an immutable object has been created', createImmutable({ name: 'github' }));
        it('When assign some key->value to it', assignKeyValue('arg', 4));
        it('Then the key->value should not be present in the object', checkKeyValue(!IS_EQUALS, 'arg', 4));
        it('And exception should be defined', isExceptionDefined);
    });

    describe('Immutable object cannot be reassignable', () => {
        it('Given an immutable object has been created', createImmutable({ name: 'github' }));
        it('When reassign existing key->value to it', assignKeyValue('name', 'continuous integration'));
        it('Then the key->value should not be updated in the object', checkKeyValue(IS_EQUALS, 'name', 'github'));
        it('And exception should be defined', isExceptionDefined);
    });

    describe('Immutable object cannot be parsed more than once', () => {
        let secondTime;
        it('Given an immutable object has been created', createImmutable({ name: 'github' }));
        it('When recreate an immutable from an immutable instance', () => {
            secondTime = Immutable(value);
        });
        it('Then both instances should have the same reference', () => {
            expect(secondTime).to.equal(value);
        });
    });

    describe('Immutable array cannot add new value', () => {
        it('Given an immutable array has been created', createImmutable([1, 2, 3]));
        it('When push a new value to it', pushValue(4));
        it('Then the array lentgh should not be changed', checkSize(3));
        it('And exception should be defined', isExceptionDefined);
    });

    describe('Immutable array cannot set value', () => {
        it('Given an immutable array has been created', createImmutable([1, 2, 3]));
        it('When push a new value to it', setValueAt(4, 1));
        it('Then the array item 2 should not be changed', checkValueAt(2, 1));
        it('And exception should be defined', isExceptionDefined);
    });
});
