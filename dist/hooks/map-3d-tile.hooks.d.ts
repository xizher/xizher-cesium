import Map3dTile from '../plugins/map-3d-tile/map-3d-tile';
export interface IUseMap3dTile {
    name: string;
    visible: boolean;
    opacity: number;
    zoom(): void;
}
declare function useMap3dTile(map3dTile: Map3dTile): IUseMap3dTile[];
export default useMap3dTile;
