function distanceVector( v1x , v1y, v1z, v2x, v2y, v2z )
{
    var dx = v1x - v2x;
    var dy = v1y - v2y;
    var dz = v1z - v2z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

export {distanceVector}