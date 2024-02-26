import React, { useState } from 'react'
import CustomTextInput from 'root/domain/system/components/inputs/CustomTextInput'
import { Text, View } from 'tamagui'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CustomButton from 'root/domain/system/components/inputs/CustomButton';
import { firebaseUpsertEvent } from 'root/domain/system/services/FirebaseDb';
import { useToast } from 'root/hooks/useToast';
import { router } from 'expo-router';
import useExecuteWithLoading from 'root/hooks/useExecuteWithLoading';

export default function EventCreation() {

    const showToast = useToast()

    const executeWithLoading = useExecuteWithLoading()

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [dateNumber, setDateNumber] = useState<number | null>(null)
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const changeDateButtonPressHandler = () => {
        setShowDateTimePicker(true)
    }

    const changeDateHandler = (event: DateTimePickerEvent, date?: Date) => {
        setShowDateTimePicker(false)

        switch (event.type) {
            case "set": {
                if (date) {
                    setDateNumber(date.getTime())
                }
                break
            }
            default: {
                break
            }
        }
    }

    const createEventButtonPressHandler = async () => {
        const eventCreationResult = await executeWithLoading(async () => {
            return await firebaseUpsertEvent(name, code, dateNumber as number)
        })

        if (eventCreationResult) {
            showToast({
                text: eventCreationResult.error,
                theme: "danger"
            })

            return
        }

        router.back()
        showToast({
            text: "Event created successfully",
        })
    }

    return <View f={1} jc={"center"} px={"$8"} gap={"$3"}>
        <CustomTextInput value={name} onChangeText={setName} placeholder='Type event name' />
        <CustomTextInput value={code} onChangeText={setCode} placeholder='Type event code' />
        <View fd={"row"} ai={"center"} gap={"$2"}>
            <Text>Date:</Text>
            {
                dateNumber !== null && <Text>{(new Date(dateNumber)).toDateString()}</Text>
            }
            <CustomButton onPress={changeDateButtonPressHandler}>Change date</CustomButton>
        </View>
        {
            showDateTimePicker &&
            <DateTimePicker
                value={dateNumber ? new Date(dateNumber) : new Date()}
                mode="date"
                onChange={changeDateHandler}
            />
        }
        <CustomButton
            onPress={createEventButtonPressHandler}
            disabled={name === "" || code === "" || dateNumber === null}
        >
            Create
        </CustomButton>
    </View>
}