import React, { useMemo } from 'react'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import colors from 'tailwindcss/colors'
import { BlurBackdrop } from './BlurBackdrop'

type CastModalProps = {
  modalRef: React.RefObject<BottomSheetModalMethods>
  children: React.ReactNode
  heightPercentage: string
}

export function Modal({
  modalRef,
  children,
  heightPercentage,
}: CastModalProps) {
  const snapPoints = useMemo(() => [heightPercentage], [heightPercentage])

  return (
    <BottomSheetModal
      backdropComponent={BlurBackdrop}
      backgroundStyle={{
        backgroundColor: colors.gray[900],
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.gray[100],
      }}
      enablePanDownToClose
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheetModal>
  )
}
