// vapir.js
(function($){

window.vapir = function (query, targetSelector, opts) {
    var url = 'https://vault.cca.edu/api/search'
        , target = $(targetSelector)
        , opts = opts || {}
        , onError = function (xhr, status, msg) {
            target.html('<p class="text-danger">Error requesting data.' + '<p><small>Status: ' + status);
        }
        , onSuccess = function (data, status, xhr) {
            var html = '';

            console.log(data);

            if (data.length === 0) {
                html = 'No search results :(';
            } else {
                html = '<ul>';

                // @todo properties available heavily dependent upon info params
                // maybe vapir shouldn't even offer info as an option?
                $.each(data.results, function (ind, item) {
                    var thumbHTML = '', rando;

                    if (item.attachments && item.attachments.length > 0) {
                        for (var i = 0, len = item.attachments.length, thumbs = []; i < len; i++) {
                            thumbs.push(item.attachments[i].links.thumbnail);
                        }
                        rando = Math.floor(Math.random() * thumbs.length);

                        thumbHTML = '<img src="' + thumbs[rando] + '">';
                    }

                    html += '<li><a href="' + item.links.view + '">' + thumbHTML + '<strong>' + item.name + "</a></strong>";
                })
            }

            target.html(html).show(opts.show);
        };

    // speed that results are displayed
    opts.show = opts.show || 'slow';

    // we accept arrays for 2 options
    // but in the search URL they're comma-separated strings
    for (var i = 0, keys = ['collections', 'info'], len = keys.length, item; i < len; i++) {
        item = opts[keys[i]];

        if ($.isArray(item)) {
            item = item.join(',');
        }
    }

    $.ajax({
        cache: true,
        // @todo construct a data object from opts above
        // only provide params that are being used e.g. no need for opts.start
        // if it's just going to be the default
        data: {
            // see REST API Guide pp. 14-15 for details on all these parameters
            // record offset, default 0
            start: opts.start || 0
            // num results to return, default 10 & max 100
            , length: opts.length || 5
            // query
            , q: query
            // comma-separated list of collection UUIDs
            // @todo not implemented b/c can't default to empty string (searches nothing)
            // , collections: opts.collections || ''
            // how to sort results, default 'relevance'
            // 'modified', 'name', & 'rating' are other options
            , order: opts.order || 'relevance'
            // sorting order
            , reverse: opts.reverse || false
            // pseudo-SQL where clause
            // @todo not implemented b/c can't default to empty string (no results)
            // this will be resolved by the data object mentioned above
            // , where: encodeURIComponent(opts.where) || ''
            // whether to show non-live items
            , showall: opts.showall || true
            // what level of information to show, defaults to just name, uuid, & links
            // options are: basic, metadata, detail, attachment, navigation, drm, all
            // only useful ones are basic, metadata, & attachment
            , info: opts.info || 'basic,attachment'
        },
        dataType: 'json',
        error: onError,
        headers: {
            // EQUELLA OAUTH token
            'X-Authorization-Token': 'c431f56c-f604-4b22-89cc-4ab321a90e64'
        },
        url: url,
        success: onSuccess
    });
};

}(jQuery));
