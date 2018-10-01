module.exports = function(inputData) {
    var config = {};

    if (inputData instanceof Element) {
        config = {
            element: inputData,
            percentage: 100
        }
    } else {
        config = {
            element: inputData.element || null,
            parent: inputData.parent || null,
            percentage: inputData.percentage || null
        };
    }

    var visibleInsideViewport = function() {
        var rect = config.element.getBoundingClientRect();
        var widthFragment = rect.width / 100 * (100 - config.percentage);
        var heightFragment = rect.height / 100 * (100 - config.percentage);

        var rules = [
            rect.top >= (0 - heightFragment),
            rect.left >= (0 - widthFragment),
            rect.bottom <= window.innerHeight + heightFragment,
            rect.right <= window.innerWidth + widthFragment
        ];

        return rules.every(function(item) {return item});
    };

    var visibleInsideScrollableContent = function() {
        var getScrollParent = function(element, includeHidden) {
            var style = getComputedStyle(element);
            var excludeStaticParent = style.position === 'absolute';
            var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

            if (style.position === 'fixed') return document.body;

            for (var parent = element; (parent = parent.parentElement);) {
                style = getComputedStyle(parent);

                if (excludeStaticParent && style.position === 'static') {
                    continue;
                }

                if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX))
                    return parent;
            }

            return element.parentNode || document.body;
        };

        var scrollableParent = config.parent || getScrollParent(config.element, true);
        var scrollableParentRect = scrollableParent.getBoundingClientRect();
        var elementRect = config.element.getBoundingClientRect();
        var widthFragment = elementRect.width / 100 * (100 - config.percentage);
        var heightFragment = elementRect.height / 100 * (100 - config.percentage);

        var rules = [
            elementRect.y >= scrollableParentRect.y - heightFragment,
            elementRect.y + elementRect.height <= (scrollableParentRect.y + scrollableParentRect.height) + heightFragment,
            elementRect.x >= scrollableParentRect.x - widthFragment,
            elementRect.x + elementRect.width <= (scrollableParentRect.x + scrollableParentRect.width) + widthFragment,
        ];

        return rules.every(function(item) {return item});
    };

    var visibleByStyles = function(element, lastResult) {
        if (element && element != document) {
            var styles = getComputedStyle(element);
            var rules = [
                styles.opacity != 0,
                styles.display != 'none',
                styles.visibility != 'hidden'
            ];

            if (rules.every(function(item) {return !!item})) {
                return visibleByStyles(element.parentNode, true);
            }
        } else {
            return lastResult || false;
        }

        return false;
    };

    return visibleInsideViewport()
        && visibleInsideScrollableContent()
        && visibleByStyles(config.element);
};