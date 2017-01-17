function Immutable(target) {
    if (!isPrimitive(target) && !Immutable.isImmutable(target)) {
        return Array.isArray(target)
            ? ImmutableArray(target)
            : ImmutableObject(target);
    }
    return target;
}

Immutable.isImmutable = ((target) => Boolean(target.__isImmutable));

function setImmutableFlag(target) {
    Object.defineProperty(target, '__isImmutable', {
        writable: false,
        enumerable: false,
        value: true
    });
    return target;
}

function ImmutableArray(target) {
    return Object.freeze(
        setImmutableFlag(
            target.map(item => Immutable(item))
        )
    );
}

function ImmutableObject(target) {
    return Object.freeze(
        setImmutableFlag(
            Object.keys(target).reduce((object, key) => (
                Object.defineProperty(object, key, {
                    writable: false,
                    enumerable: true,
                    configurable: true,
                    value: Immutable(target[key])
                })
            ), {})
        )
    );

}

function isPrimitive(target) {
    return (['array', 'object'].indexOf(typeof target) < 0
    && !Array.isArray(target)
    || target instanceof String || target instanceof Number
    || target instanceof Date || target instanceof Boolean);
}

export default Immutable;
