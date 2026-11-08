# Minecraft Dungeons II 1.1.3.0 (local RP5 bring-up, not upstream): main build c6b32f4d3d4243ff190b082b4f6aea18.
# OnlineSubsystemNativeXboxLive (Xal.cpp:78) aborts the game when XblInitialize fails ("XblInitialize failed: 0x%X") -- it fails on the host.
# The b.ne after the call (taken unless the result is success or 0x89235207) becomes a nop: the failure is ignored and the game goes on offline.
CUTS = {
    'c6b32f4d3d4243ff190b082b4f6aea18': [
        (0x4238cb4, '61040054', '1f2003d5', 'XblInitialize failure ignored (Xal.cpp:78 fatal check)'),
    ],
}
