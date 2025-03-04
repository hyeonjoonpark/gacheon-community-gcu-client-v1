import { create } from 'zustand'

type Machine = {
  id: number
  type: '세탁기' | '건조기'
  location: MachineLocation,
  status: MachineStatus,
  timeRemaining: number
}

enum MachineLocation {
    MALE = '남자 기숙사',
    FEMALE = '여자 기숙사'
}

enum MachineStatus {
    AVAILABLE = '사용 가능',
    IN_USE = '사용 중',
    BROKEN = '고장'
}

type MachineStore = {
  machines: Machine[]
  reportMalfunction: (machineId: number) => void
}

export const useMachineStore = create<MachineStore>((set) => ({
  machines: [
    { id: 1, type: '세탁기', location: MachineLocation.MALE, status: MachineStatus.AVAILABLE, timeRemaining: 0 },
    { id: 2, type: '세탁기', location: MachineLocation.MALE, status: MachineStatus.IN_USE, timeRemaining: 30 },
    { id: 3, type: '건조기', location: MachineLocation.MALE, status: MachineStatus.BROKEN, timeRemaining: 0 },
    { id: 4, type: '건조기', location: MachineLocation.FEMALE, status: MachineStatus.AVAILABLE, timeRemaining: 0 },
  ],
  reportMalfunction: (machineId: number) =>
    set((state) => ({
      machines: state.machines.map((machine) =>
        machine.id === machineId
          ? { ...machine, status: MachineStatus.BROKEN }
          : machine
      ),
    })),
})) 