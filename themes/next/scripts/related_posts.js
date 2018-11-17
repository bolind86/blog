hexo.extend.helper.register('related_posts', function(currentPost, allPosts){
    var relatedPosts = [];
    currentPost.tags.forEach(function (tag) {
        allPosts.forEach(function (post) {
            if (isTagRelated(tag.name, post.tags)) {
                var relatedPost = {
                    title: post.title,
                    path: post.path,
                    weight: 1
                };
                var index = findItem(relatedPosts, 'path', post.path);
                if (index != -1) {
                    relatedPosts[index].weight += 1;
                } else{
                    if (currentPost.path != post.path) {
                        relatedPosts.push(relatedPost);
                    };
                };
            };
        });
    });
    if (relatedPosts.length == 0) {return ''};
    var result = '<div class="post-body"><div class="note primary"><div class="recommended_posts"><h4 class="recommended" style="color:red; text-align:left"> 相关文章：</h4><ul class="recommended-ul">';
    relatedPosts = relatedPosts.sort(compare('weight'));
    for (var i = 0; i < Math.min(relatedPosts.length, 5); i++) {
        result += '<li style="text-align:left; margin:10px;"><a href="/blog/' + relatedPosts[i].path + '">' + relatedPosts[i].title + '</a></li>';
    };
    result += '</ul></div></div></div>';
    // console.log(relatedPosts);
    return result;
});
hexo.extend.helper.register('echo', function(path){
  return path;
});
function isTagRelated (tagName, TBDtags) {
    var result = false;
    TBDtags.forEach(function (tag) {
        if (tagName == tag.name) {
            result = true;
        };
    })
    return result;
}
function findItem (arrayToSearch, attr, val) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] == val) {
            return i
        };
    };
    return -1;
}
function compare (attr) {
    return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
    }
}