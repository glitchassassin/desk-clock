/**
 * Given a path and a distance along that path, return
 * the coordinates of the point at `distance` from the
 * beginning of `path`.
 *
 * @param path
 * @param distance
 * @return {number[]|null}
 */
function TweenPath(path, distance) {
    let p1, p2;
    let d = 0;
    while (distance >= d && path.length >= 2) {
        distance -= d;
        p1 = path.shift();
        p2 = path[0];
        d = Math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2);
    }
    if (distance > d) { return null; } // reached end of path
    return [
        p1[0] + (distance/d) * (p2[0] - p1[0]),
        p1[1] + (distance/d) * (p2[1] - p1[1]),
    ];
}

export default TweenPath;
